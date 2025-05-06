import { InvestorHeader } from '@/components/investor/InvestorHeader'
import { InvestorSidebar } from '@/components/investor/InvestorSidebar'

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <InvestorSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <InvestorHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
