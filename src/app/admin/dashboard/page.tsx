import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, DollarSign, FileText, Users, File, Settings } from 'lucide-react'
import { Overview } from '@/components/dashboard/Overview'
import { RecentInvestments } from '@/components/dashboard/RecentInvestments'
import { RecentDocuments } from '@/components/dashboard/RecentDocuments'
import { RecentCRM } from '@/components/dashboard/RecentCRM'

const stats = [
  {
    title: 'Total Investments',
    value: '$4.8M',
    icon: DollarSign,
    change: '+12%',
    changeType: 'increase'
  },
  {
    title: 'Active Investors',
    value: '40k',
    icon: Users,
    change: '+8%',
    changeType: 'increase'
  },
  {
    title: 'Due Diligence',
    value: '95%',
    icon: FileText,
    change: '+3%',
    changeType: 'increase'
  },
  {
    title: 'CRM Contacts',
    value: '10k',
    icon: Users,
    change: '+5%',
    changeType: 'increase'
  }
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-luxury-primary">Admin Dashboard</h2>
        <Button className="luxury-button">
          New Investment
          <File className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="luxury-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold">
                <stat.icon className="h-2 w-2" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`mt-1 text-xs ${
                stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 luxury-card">
          <CardHeader>
            <CardTitle>Investment Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3 luxury-card">
          <CardHeader>
            <CardTitle>Recent Investments</CardTitle>
            <CardDescription>
              View all recent investment activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentInvestments />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 luxury-card">
          <CardHeader>
            <CardTitle>Due Diligence</CardTitle>
            <CardDescription>
              View recently uploaded due diligence documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentDocuments />
          </CardContent>
        </Card>
        <Card className="col-span-3 luxury-card">
          <CardHeader>
            <CardTitle>CRM Activity</CardTitle>
            <CardDescription>
              View recent CRM interactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentCRM />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
