// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//     const [file, setFile] = useState(null);
//     const [password, setPassword] = useState("");
//     const [filename, setFilename] = useState("");

//     // Handle file selection
//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     // Handle encryption upload
//     const handleEncrypt = async () => {
//         if (!file || !password) {
//             alert("Please select a file and enter a password.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("password", password);

//         try {
//             const response = await axios.post("http://127.0.0.1:5000/upload", formData);
//             alert(response.data.message);
//         } catch (error) {
//             alert("Error encrypting file.");
//         }
//     };

//     // Handle decryption and download
//     const handleDecrypt = async () => {
//         if (!filename || !password) {
//             alert("Please enter the filename and password.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("filename", filename);
//         formData.append("password", password);

//         try {
//             const response = await axios.post("http://127.0.0.1:5000/decrypt", formData, {
//                 responseType: "blob",
//             });

//             if (response.status === 401) {
//                 alert("Incorrect password.");
//                 return;
//             }

//             if (response.status === 404) {
//                 alert("File not found.");
//                 return;
//             }

//             // Create a download link
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", filename);
//             document.body.appendChild(link);
//             link.click();
//         } catch (error) {
//             alert("Error decrypting file.");
//         }
//     };

//     return (
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h2>File Encryption & Decryption</h2>

//             {/* File Upload Section */}
//             <h3>Encrypt File</h3>
//             <input type="file" onChange={handleFileChange} />
//             <br />
//             <input
//                 type="password"
//                 placeholder="Enter encryption password"
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <br />
//             <button onClick={handleEncrypt}>Encrypt & Upload</button>

//             {/* File Download Section */}
//             <h3>Decrypt File</h3>
//             <input
//                 type="text"
//                 placeholder="Enter filename"
//                 onChange={(e) => setFilename(e.target.value)}
//             />
//             <br />
//             <input
//                 type="password"
//                 placeholder="Enter decryption password"
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <br />
//             <button onClick={handleDecrypt}>Decrypt & Download</button>
//         </div>
//     );
// }

// export default App;
import React, { useState } from "react";
import axios from "axios";

function App() {
    const [file, setFile] = useState(null);
    const [encryptPassword, setEncryptPassword] = useState("");
    const [decryptPassword, setDecryptPassword] = useState("");
    const [filename, setFilename] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle encryption upload
    const handleEncrypt = async () => {
        if (!file || !encryptPassword) {
            alert("Please select a file and enter a password.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("password", encryptPassword);

        try {
            const response = await axios.post("http://127.0.0.1:5000/upload", formData);
            alert(response.data.message);
            setFilename(response.data.filename); // Store encrypted filename
        } catch (error) {
            alert("Error encrypting file.");
        }
    };

    // Handle decryption and download
    const handleDecrypt = async () => {
        if (!filename || !decryptPassword) {
            alert("Please enter the filename and password.");
            return;
        }

        const formData = new FormData();
        formData.append("filename", filename);
        formData.append("password", decryptPassword);

        try {
            const response = await axios.post("http://127.0.0.1:5000/decrypt", formData, {
                responseType: "blob",
            });

            if (response.status === 401) {
                alert("Incorrect password.");
                return;
            }

            if (response.status === 404) {
                alert("File not found.");
                return;
            }

            // Create a download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename.replace(".enc", ""));
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            alert("Error decrypting file.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    🔐 File Encryption & Decryption
                </h2>

                {/* Encrypt File Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Encrypt File</h3>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" 
                    />
                    <input
                        type="password"
                        placeholder="Enter encryption password"
                        className="w-full px-4 py-2 border rounded-lg mt-3 focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setEncryptPassword(e.target.value)}
                    />
                    <button 
                        onClick={handleEncrypt} 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 mt-3 rounded-lg transition"
                    >
                        Encrypt & Upload
                    </button>
                </div>

                {/* Decrypt File Section */}
                <div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Decrypt File</h3>
                    <input
                        type="text"
                        placeholder="Enter filename"
                        value={filename}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setFilename(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter decryption password"
                        className="w-full px-4 py-2 border rounded-lg mt-3 focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setDecryptPassword(e.target.value)}
                    />
                    <button 
                        onClick={handleDecrypt} 
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 mt-3 rounded-lg transition"
                    >
                        Decrypt & Download
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
