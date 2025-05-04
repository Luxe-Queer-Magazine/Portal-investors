import { Button } from '@/components/ui/button'
import { 
  Home, 
  DollarSign, 
  FileText, 
  Users, 
  File, 
  Settings, 
  LogOut,
  BarChart,
  Mail,
  Shield
} from 'lucide-react'
import Link from 'next/link'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: Home
  },
  {
    name: 'Investments',
    href: '/admin/investments',
    icon: DollarSign
  },
  {
    name: 'Documents',
    href: '/admin/documents',
    icon: FileText
  },
  {
    name: 'CRM',
    href: '/admin/crm',
    icon: Users
  },
  {
    name: 'Due Diligence',
    href: '/admin/due-diligence',
    icon: File
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart
  },
  {
    name: 'Marketing',
    href: '/admin/marketing',
    icon: Mail
  },
  {
    name: 'User Management',
    href: '/admin/users',
    icon: Shield
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
]

export function AdminSidebar() {
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
