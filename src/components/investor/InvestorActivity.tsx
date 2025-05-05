import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Clock, DollarSign, FileText, Bell } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'Distribution',
    description: 'Quarterly distribution received',
    date: '2025-05-01',
    amount: '$12,500'
  },
  {
    id: 2,
    type: 'Document',
    description: 'New tax document available',
    date: '2025-04-15',
    amount: null
  },
  {
    id: 3,
    type: 'Valuation',
    description: 'Portfolio valuation updated',
    date: '2025-04-10',
    amount: '+$22,500'
  },
  {
    id: 4,
    type: 'Notice',
    description: 'Upcoming investor meeting',
    date: '2025-04-05',
    amount: null
  }
]

export function InvestorActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-md hover:bg-muted/50">
          <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
            activity.type === 'Distribution' ? 'bg-green-100' :
            activity.type === 'Document' ? 'bg-blue-100' :
            activity.type === 'Valuation' ? 'bg-purple-100' :
            'bg-yellow-100'
          }`}>
            {activity.type === 'Distribution' && <DollarSign className={`h-5 w-5 text-green-600`} />}
            {activity.type === 'Document' && <FileText className={`h-5 w-5 text-blue-600`} />}
            {activity.type === 'Valuation' && <DollarSign className={`h-5 w-5 text-purple-600`} />}
            {activity.type === 'Notice' && <Bell className={`h-5 w-5 text-yellow-600`} />}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{activity.description}</p>
              {activity.amount && (
                <span className={`text-sm font-medium ${
                  activity.amount.startsWith('+') ? 'text-green-600' : 'text-luxury-primary'
                }`}>
                  {activity.amount}
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>{new Date(activity.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
