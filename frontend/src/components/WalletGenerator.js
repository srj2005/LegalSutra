import { generateUserWallet, uploadEncryptedFile } from "../services/lighthouseService";

const WalletGenerator = () => {
  const createWallet = async () => {
    const wallet = await generateUserWallet();
    console.log("Public Key:", wallet.publicKey);
    console.log("Private Key:", wallet.privateKey);
  };

  const handleFileUpload = async () => {
    const filePath = "/path/to/file.jpg";
    const publicKey = "UserPublicKey";  // Fetch from Firebase
    const privateKey = "UserPrivateKey"; // User must enter manually

    const result = await uploadEncryptedFile(filePath, publicKey, privateKey);
    console.log("File Upload Response:", result);
  };

  return (
    <div>
      <button onClick={createWallet}>Generate Wallet</button>
      <button onClick={handleFileUpload}>Upload Encrypted File</button>
    </div>
  );
};

export default WalletGenerator;
