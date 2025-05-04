import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { Footer } from '@/components/dashboard/Footer'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 bg-background/95">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
