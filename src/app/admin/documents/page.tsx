'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { 
  Search, 
  PlusCircle, 
  Download, 
  Filter, 
  MoreHorizontal, 
  FileText, 
  User, 
  Clock,
  Eye,
  Edit,
  Trash2,
  Upload,
  CheckCircle,
  XCircle
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data for documents
const documents = [
  {
    id: 1,
    name: 'Investment Agreement',
    investor: 'John Smith',
    status: 'Signed',
    date: '2025-05-01',
    type: 'PDF',
    size: '1.2MB'
  },
  {
    id: 2,
    name: 'Series A Term Sheet',
    investor: 'Jane Doe',
    status: 'Pending Signature',
    date: '2025-04-30',
    type: 'DOCX',
    size: '2.5MB'
  },
  {
    id: 3,
    name: 'Financial Statements',
    investor: 'Robert Johnson',
    status: 'Available',
    date: '2025-04-28',
    type: 'XLSX',
    size: '3.1MB'
  },
  {
    id: 4,
    name: 'Due Diligence Report',
    investor: 'Sarah Williams',
    status: 'Pending Review',
    date: '2025-04-25',
    type: 'PDF',
    size: '1.8MB'
  },
  {
    id: 5,
    name: 'Investor Questionnaire',
    investor: 'Michael Brown',
    status: 'Completed',
    date: '2025-04-20',
    type: 'PDF',
    size: '0.9MB'
  },
  {
    id: 6,
    name: 'Legal Review',
    investor: 'Emily Davis',
    status: 'Pending Signature',
    date: '2025-04-15',
    type: 'PDF',
    size: '2.2MB'
  }
]

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.investor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <AdminHeader />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Manage investor documents and signatures.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="luxury" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Status
                <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Signed</DropdownMenuItem>
              <DropdownMenuItem>Pending Signature</DropdownMenuItem>
              <DropdownMenuItem>Available</DropdownMenuItem>
              <DropdownMenuItem>Pending Review</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Document List</CardTitle>
          <CardDescription>
            Showing {filteredDocuments.length} of {documents.length} documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Investor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>File Info</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
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
                      doc.status === 'Signed' || doc.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      doc.status === 'Pending Signature' || doc.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
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
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>{doc.type}</span>
                      <span className="text-sm text-muted-foreground">• {doc.size}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      {(doc.status === 'Pending Review') && (
                        <>
                          <Button variant="ghost" size="icon" className="text-green-500">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
