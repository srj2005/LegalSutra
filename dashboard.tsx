import type React from "react"
import { useState } from "react"
import { Upload, AlertTriangle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Here you would typically send the file to your backend for processing
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#333333]">
      <header className="bg-[#1a365d] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">LegalSutra</h1>
          <Select onValueChange={setSelectedLanguage} defaultValue={selectedLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="telugu">Telugu</SelectItem>
              <SelectItem value="marathi">Marathi</SelectItem>
              <SelectItem value="gujarati">Gujarati</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload Contract</CardTitle>
            <CardDescription>Upload your contract for review and analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#1a365d] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-[#1a365d]" />
                  <p className="mb-2 text-sm text-[#333333]">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-[#333333]">PDF, DOCX (MAX. 10MB)</p>
                </div>
                <Input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.docx"
                />
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#1a365d] hover:bg-[#2a466d]">Analyze Contract</Button>
          </CardFooter>
        </Card>

        {uploadedFile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Summary of the contract will be displayed here in {selectedLanguage}.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-[#ffd700]" />
                  <span>Risk Score: 65/100</span>
                </div>
                <p className="mt-2">Explanation of the risk score and compliance with Indian legal contract laws.</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Highlighted Contract</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Contract with highlighted important payment and deadline terms will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Contract Assistant</CardTitle>
            <CardDescription>Ask questions about your contract</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input placeholder="Type your question here..." />
              <Button className="bg-[#008080] hover:bg-[#006666]">
                <MessageCircle className="mr-2 h-4 w-4" /> Ask
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-[#1a365d] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 LegalSutra. All rights reserved.</p>
          <p className="mt-2 text-sm">Secured by Lighthouse Protocol with AES-256 encryption</p>
        </div>
      </footer>
    </div>
  )
}

