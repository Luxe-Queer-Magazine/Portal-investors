import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { FileText, Download, Eye, X } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  status: string
  date: string
  data: Record<string, string>
  url?: string
}

interface DocumentPreviewProps {
  document: Document | null
  onClose: () => void
}

export function DocumentPreview({ document, onClose }: DocumentPreviewProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  if (!document) {
    return null
  }
  
  const handleDownload = async () => {
    if (!document.url) return
    
    setIsLoading(true)
    try {
      // In a real app, you would handle the download here
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create a link and click it to download
      const link = document.createElement('a')
      link.href = document.url
      link.download = document.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading document:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-auto rounded-lg border bg-background p-6 shadow-lg">
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="mb-6 flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{document.name}</h2>
            <p className="text-sm text-muted-foreground">
              {document.type} • {new Date(document.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              document.status === 'Signed' ? 'bg-green-100 text-green-800' :
              document.status === 'Pending Signature' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {document.status}
            </span>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={isLoading || !document.url}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm" disabled={!document.url}>
                <Eye className="h-4 w-4 mr-1" />
                View Full Document
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Document Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(document.data).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <Label>{key.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</Label>
                    <p className="text-sm text-muted-foreground">{value || 'Not provided'}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {document.status === 'Pending Signature' && (
            <div className="flex justify-end">
              <Button className="bg-luxury-primary hover:bg-luxury-primary/90">
                Sign Document
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
