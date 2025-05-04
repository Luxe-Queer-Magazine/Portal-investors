import { Button } from '@/components/ui/button'
import { 
  Home, 
  DollarSign, 
  FileText, 
  PieChart, 
  Calendar, 
  Settings, 
  LogOut,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'

const navigation = [
  {
    name: 'Dashboard',
    href: '/investor/dashboard',
    icon: Home
  },
  {
    name: 'My Investments',
    href: '/investor/investments',
    icon: DollarSign
  },
  {
    name: 'Documents',
    href: '/investor/documents',
    icon: FileText
  },
  {
    name: 'Performance',
    href: '/investor/performance',
    icon: PieChart
  },
  {
    name: 'Distributions',
    href: '/investor/distributions',
    icon: Calendar
  },
  {
    name: 'Settings',
    href: '/investor/settings',
    icon: Settings
  },
  {
    name: 'Support',
    href: '/investor/support',
    icon: HelpCircle
  }
]

export function InvestorSidebar() {
  return (
    <div className="w-64 border-r bg-background">
      <div className="flex h-16 items-center justify-center border-b px-4">
        <img
          src="/logo.svg"
          alt="Luxe Queer Logo"
          className="h-8 w-auto"
        />
      </div>
      <div className="flex flex-col space-y-1 p-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="relative flex items-center space-x-3 rounded-md p-3 text-sm font-medium hover:bg-muted"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
        <div className="flex-1"></div>
        <Link
          href="/api/auth/signout"
          className="mt-auto flex items-center space-x-3 rounded-md p-3 text-sm font-medium hover:bg-muted"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign out</span>
        </Link>
      </div>
    </div>
  )
}
