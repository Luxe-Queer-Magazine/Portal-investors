import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { User, Clock, MessageSquare, Phone, Mail } from 'lucide-react'

const crmActivities = [
  {
    id: 1,
    contact: 'John Smith',
    type: 'Call',
    status: 'Completed',
    date: '2025-05-01',
    notes: 'Discussed investment opportunities'
  },
  {
    id: 2,
    contact: 'Jane Doe',
    type: 'Email',
    status: 'Pending',
    date: '2025-04-30',
    notes: 'Sent investment proposal'
  },
  {
    id: 3,
    contact: 'Robert Johnson',
    type: 'Meeting',
    status: 'Scheduled',
    date: '2025-05-05',
    notes: 'Due diligence review'
  },
  {
    id: 4,
    contact: 'Sarah Williams',
    type: 'Message',
    status: 'Completed',
    date: '2025-04-28',
    notes: 'Follow-up on due diligence'
  }
]

export function RecentCRM() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contact</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {crmActivities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{activity.contact}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                {activity.type === 'Call' && <Phone className="h-4 w-4" />}
                {activity.type === 'Email' && <Mail className="h-4 w-4" />}
                {activity.type === 'Meeting' && <MessageSquare className="h-4 w-4" />}
                {activity.type === 'Message' && <MessageSquare className="h-4 w-4" />}
                <span>{activity.type}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                activity.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {activity.status}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{new Date(activity.date).toLocaleDateString()}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm text-muted-foreground">
                {activity.notes}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
