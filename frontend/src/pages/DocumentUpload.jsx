"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Upload, X, FileText } from "lucide-react";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
import kavach from "@lighthouse-web3/kavach";

const apiKey = "e5d459c6.e9e327747ba24a76aaaf35a882a70f96";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState(null);
  const [error, setError] = useState("");
  const [wallet, setWallet] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchWallet();
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchWallet = async () => {
    try {
      const response = await fetch("http://localhost:3001/lighthouse/generate-wallet");

      if (!response.ok) {
        throw new Error(`Failed to fetch wallet: ${response.statusText}`);
      }

      const data = await response.json();
      setWallet(data);
    } catch (err) {
      console.error("Error fetching wallet:", err);
      setError("Failed to generate wallet: " + err.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setDocumentTitle(selectedFile.name.replace(".pdf", ""));
      setError("");
    } else {
      setError("Only PDF files are supported");
    }
  };

  const removeFile = () => {
    setFile(null);
    setDocumentTitle("");
    setCid(null);
  };

  const handleUpload = async () => {
    if (!file || !user || !wallet?.privateKey) {
      setError("Authentication required, and wallet must be generated");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const token = await user.getIdToken();
      const signer = new ethers.Wallet(wallet.privateKey);
      const authMessage = await kavach.getAuthMessage(signer.address);
      const signedMessage = await signer.signMessage(authMessage.message);

      const result = await lighthouse.uploadEncrypted(
        file,
        apiKey,
        wallet.publicKey,
        signedMessage,
        (progress) => console.log(`Upload progress: ${progress}%`)
      );

      if (result && result.data && result.data[0]?.Hash) {
        setCid(result.data[0].Hash);
      } else {
        throw new Error("Upload failed! No CID received.");
      }

      const backendResponse = await fetch("http://localhost:3001/lighthouse/upload-encrypted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          documentTitle,
          cid: result.data[0].Hash,
          walletAddress: wallet.publicKey,
          signedMessage,
          apiKey,
        }),
      });

      if (!backendResponse.ok) {
        const errorData = await backendResponse.json();
        setError(`Upload failed! Server responded with: ${errorData.message}`);
        return;
      }

      const responseData = await backendResponse.json();
      console.log("Server Response Data:", responseData);
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.message || "An error occurred while uploading the document.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upload Document</h1>
        <Card>
          <CardHeader>
            <CardTitle>Upload Legal Document</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>}
            <div className="space-y-4">
              {wallet && (
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold">Generated Wallet</h3>
                  <p><strong>Public Key:</strong> {wallet.publicKey}</p>
                  <p><strong>Private Key:</strong> {wallet.privateKey}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                <Input value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} placeholder="Enter document title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                {!file ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}>
                    <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">Click to upload</p>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FileText className="h-8 w-8 text-indigo-500 mr-3" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    </div>
                    <button type="button" onClick={removeFile} className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="button" variant="outline" className="mr-2" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button type="button" variant="primary" disabled={uploading || !file} onClick={handleUpload}>
              {uploading ? "Uploading..." : "Upload to Lighthouse"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DocumentUpload;
