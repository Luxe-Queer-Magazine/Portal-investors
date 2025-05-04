import { File, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DocumentDownloadProps {
  file: {
    id: string
    name: string
    url: string
    type: string
    size: number
    created_at: string
  }
}

export function DocumentDownload({ file }: DocumentDownloadProps) {
  const getFileIcon = () => {
    const extension = file.name.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return <File className="w-4 h-4 mr-2 text-red-500" />
      case 'doc':
      case 'docx':
        return <File className="w-4 h-4 mr-2 text-blue-500" />
      case 'xls':
      case 'xlsx':
        return <File className="w-4 h-4 mr-2 text-green-500" />
      default:
        return <File className="w-4 h-4 mr-2 text-gray-500" />
    }
  }

  const getFileSize = () => {
    const size = file.size / 1024 / 1024 // Convert to MB
    return `${size.toFixed(2)} MB`
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2">
        {getFileIcon()}
        <span className="text-sm">
          {file.name}
        </span>
      </div>
      <span className="text-sm text-muted-foreground">
        {getFileSize()}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.open(file.url, '_blank')}
      >
        <Download className="w-4 h-4" />
      </Button>
    </div>
  )
}
