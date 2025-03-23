export const generateUserWallet = async () => {
    try {
      const response = await fetch("http://localhost:5001/lighthouse/generate-wallet");
      const data = await response.json();
      console.log("Generated Wallet:", data);
      return data;
    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  };
  
  export const uploadEncryptedFile = async (filePath, publicKey, privateKey) => {
    try {
      const response = await fetch("http://localhost:5001/lighthouse/upload-encrypted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath, publicKey, privateKey }),
      });
  
      return await response.json();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  