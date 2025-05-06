import { DocumentType } from '@/lib/utils/documents'
import { DocumentManager } from '@/lib/utils/documents'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/ui/file-upload'

interface DocumentUploadProps {
  documentType: DocumentType
  investorId: string
  onUpload: (document: any) => void
}

export function DocumentUpload({ documentType, investorId, onUpload }: DocumentUploadProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const documentManager = new DocumentManager()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const document = await documentManager.createDocument(
        documentType.id,
        investorId,
        formData,
        files
      )

      onUpload(document)
    } catch (error) {
      console.error('Error uploading document:', error)
      alert('Failed to upload document. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Upload Document</h3>
        <p className="text-sm text-muted-foreground">
          Please provide the required information and files for this document.
        </p>
      </div>

      {documentType.fields && Object.entries(documentType.fields).map(([field, config]) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>{config.label}</Label>
          {config.type === 'text' ? (
            <Input
              id={field}
              name={field}
              value={formData[field] || ''}
              onChange={handleInputChange}
              required={config.required}
            />
          ) : config.type === 'number' ? (
            <Input
              id={field}
              name={field}
              type="number"
              value={formData[field] || ''}
              onChange={handleInputChange}
              required={config.required}
            />
          ) : config.type === 'date' ? (
            <Input
              id={field}
              name={field}
              type="date"
              value={formData[field] || ''}
              onChange={handleInputChange}
              required={config.required}
            />
          ) : config.type === 'boolean' ? (
            <div className="flex items-center space-x-2">
              <input
                id={field}
                name={field}
                type="checkbox"
                checked={formData[field] === true}
                onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.checked }))}
              />
              <Label htmlFor={field}>{config.label}</Label>
            </div>
          ) : (
            <Textarea
              id={field}
              name={field}
              value={formData[field] || ''}
              onChange={handleInputChange}
              required={config.required}
            />
          )}
        </div>
      ))}

      <div className="space-y-2">
        <Label>Supporting Documents</Label>
        <FileUpload
          multiple
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
        />
        <p className="text-sm text-muted-foreground">
          Please upload any supporting documents (PDF, DOC, DOCX)
        </p>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Document'}
      </Button>
    </form>
  )
}
