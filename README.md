# LegalSutra

LegalSutra is an AI-powered legal document processing platform designed to simplify contract understanding, assess risks, and provide multilingual support. It helps users by summarizing contracts, translating legal jargon into plain language, and offering voice-based AI assistance.

## Features

- **Contract Summarization:** AI-driven summaries of key contract terms, obligations, and risks.
- **Risk Assessment:** Calculates a risk score based on potential legal risks in the contract.
- **AI-Powered Voice Helpline:** Telephone support for contract-related queries with human-like AI assistance.
- **Compliance Analysis:** Checks contracts for adherence to Indian legal compliance and regulatory standards.
- **OCR & Text Extraction:** Extracts text from PDFs and scanned documents for seamless analysis.
- **Collaboration & Annotation:** Allows users to add comments, highlight important sections, and share documents with others.

## Installation

### **Prerequisites**
- Node.js & npm
- MongoDB / PostgreSQL
- Firebase Account
- Twilio / RASA API Keys

### **Steps**
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/legalsutra.git
   cd legalsutra
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   DATABASE_URL=your_database_url
   FIREBASE_API_KEY=your_firebase_api_key
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## Usage
- Upload a legal document (PDF/DOCX) for AI-driven analysis.
- Get a summarized version with key terms, risks, and obligations.
- Translate legal content into plain Hindi or other languages.
- Use the AI voice helpline to query contracts in real-time.
- Share, annotate, and collaborate on legal documents.
