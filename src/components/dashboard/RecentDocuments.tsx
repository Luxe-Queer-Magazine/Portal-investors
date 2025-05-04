import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FileText, Clock, User, File, CheckCircle, XCircle } from 'lucide-react'

const documents = [
  {
    id: 1,
    name: 'Investment Agreement',
    investor: 'John Smith',
    status: 'Reviewed',
    date: '2025-05-01',
    type: 'PDF',
    size: '1.2MB'
  },
  {
    id: 2,
    name: 'Due Diligence Report',
    investor: 'Jane Doe',
    status: 'Pending',
    date: '2025-04-30',
    type: 'DOCX',
    size: '2.5MB'
  },
  {
    id: 3,
    name: 'Financial Statements',
    investor: 'Robert Johnson',
    status: 'Completed',
    date: '2025-04-28',
    type: 'XLSX',
    size: '3.1MB'
  },
  {
    id: 4,
    name: 'Legal Review',
    investor: 'Sarah Williams',
    status: 'Rejected',
    date: '2025-04-25',
    type: 'PDF',
    size: '1.8MB'
  }
]

export function RecentDocuments() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Document</TableHead>
          <TableHead>Investor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>File Info</TableHead>
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
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{doc.investor}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                doc.status === 'Completed' ? 'bg-green-100 text-green-800' :
                doc.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                doc.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
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
              <div className="flex items-center space-x-2">
                <File className="h-4 w-4" />
                <span>{doc.type}</span>
                <span className="text-sm text-muted-foreground">• {doc.size}</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
