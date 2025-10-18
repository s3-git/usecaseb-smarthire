import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"

interface Step1UploadCVProps {
  isUploading: boolean
  uploadedFile: File | null
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Step1UploadCV({ isUploading, uploadedFile, onFileChange }: Step1UploadCVProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Step 1: Upload Your CV</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Upload your CV</h3>
          <p className="text-sm text-gray-500 mb-4">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
          <label htmlFor="cv-upload">
            <Button type="button" onClick={() => document.getElementById("cv-upload")?.click()} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Choose File"}
            </Button>
          </label>
          <input id="cv-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={onFileChange} />
          {uploadedFile && <p className="mt-4 text-sm text-green-600">Selected: {uploadedFile.name}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
