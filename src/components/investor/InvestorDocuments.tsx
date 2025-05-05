import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FileText, Clock, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

const documents = [
  {
    id: 1,
    name: 'Investment Agreement',
    status: 'Signed',
    date: '2025-03-15',
    type: 'PDF',
    action: 'view'
  },
  {
    id: 2,
    name: 'Series A Term Sheet',
    status: 'Pending Signature',
    date: '2025-05-10',
    type: 'PDF',
    action: 'sign'
  },
  {
    id: 3,
    name: 'Q1 2025 Financial Report',
    status: 'Available',
    date: '2025-04-15',
    type: 'XLSX',
    action: 'download'
  },
  {
    id: 4,
    name: 'Tax Documents 2024',
    status: 'Available',
    date: '2025-02-28',
    type: 'PDF',
    action: 'download'
  }
]

export function InvestorDocuments() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Document</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{doc.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                doc.status === 'Signed' ? 'bg-green-100 text-green-800' :
                doc.status === 'Pending Signature' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {doc.status}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{new Date(doc.date).toLocaleDateString()}</span>
              </div>
            </TableCell>
            <TableCell>
              {doc.action === 'download' && (
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              )}
              {doc.action === 'view' && (
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              )}
              {doc.action === 'sign' && (
                <Button variant="luxury" size="sm">
                  Sign Now
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
