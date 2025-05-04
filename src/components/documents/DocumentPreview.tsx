import { Document } from '@/lib/utils/documents'
import { DocumentManager } from '@/lib/utils/documents'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { DocumentDownload } from './DocumentDownload'

interface DocumentPreviewProps {
  document: Document
  onStatusChange: (status: Document['status']) => void
}

export function DocumentPreview({ document, onStatusChange }: DocumentPreviewProps) {
  const [loading, setLoading] = useState(false)
  const documentManager = new DocumentManager()

  const handleStatusChange = async (newStatus: Document['status']) => {
    setLoading(true)
    try {
      await documentManager.updateDocumentStatus(document.id, newStatus)
      onStatusChange(newStatus)
    } catch (error) {
      console.error('Error updating document status:', error)
      alert('Failed to update document status')
    } finally {
      setLoading(false)
    }
  }

  const getStatusOptions = () => {
    switch (document.status) {
      case 'pending':
        return [
          { value: 'completed', label: 'Mark as Completed' },
          { value: 'rejected', label: 'Reject Document' }
        ]
      case 'completed':
        return [
          { value: 'reviewed', label: 'Mark as Reviewed' },
          { value: 'rejected', label: 'Reject Document' }
        ]
      case 'reviewed':
        return [
          { value: 'completed', label: 'Mark as Completed' },
          { value: 'rejected', label: 'Reject Document' }
        ]
      case 'rejected':
        return [
          { value: 'pending', label: 'Reopen Document' }
        ]
      default:
        return []
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Document Details</h3>
        <Button
          variant="outline"
          onClick={() => window.open(document.files[0]?.url || '', '_blank')}
        >
          View Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Document Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Current Status:</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    document.status === 'completed' ? 'bg-green-100 text-green-800' :
                    document.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                    document.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Actions:</h4>
                <div className="space-y-2">
                  {getStatusOptions().map((option) => (
                    <Button
                      key={option.value}
                      variant="outline"
                      onClick={() => handleStatusChange(option.value as Document['status'])}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(document.data).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <Label>{key.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</Label>
                  <p className="text-sm text-muted-foreground">{value || 'Not provided'}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supporting Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {document.files.map((file) => (
                <DocumentDownload
                  key={file.id}
                  file={file}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
