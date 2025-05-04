import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DollarSign, Clock, User, FileText } from 'lucide-react'

const investments = [
  {
    id: 1,
    investor: 'John Smith',
    amount: '$500,000',
    status: 'Completed',
    date: '2025-05-01',
    documents: 3
  },
  {
    id: 2,
    investor: 'Jane Doe',
    amount: '$750,000',
    status: 'Pending',
    date: '2025-04-30',
    documents: 2
  },
  {
    id: 3,
    investor: 'Robert Johnson',
    amount: '$1,000,000',
    status: 'Completed',
    date: '2025-04-28',
    documents: 4
  },
  {
    id: 4,
    investor: 'Sarah Williams',
    amount: '$250,000',
    status: 'Pending',
    date: '2025-04-25',
    documents: 1
  }
]

export function RecentInvestments() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Investor</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Documents</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investments.map((investment) => (
          <TableRow key={investment.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{investment.investor}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>{investment.amount}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                investment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {investment.status}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{new Date(investment.date).toLocaleDateString()}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{investment.documents}</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
