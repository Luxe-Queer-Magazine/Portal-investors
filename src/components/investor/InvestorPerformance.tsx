import { Card, CardContent } from '@/components/ui/card'

export function InvestorPerformance() {
  return (
    <div className="h-[300px] w-full">
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-luxury-primary">+9.5%</div>
          <div className="text-sm text-muted-foreground">Total Return</div>
          <div className="mt-4 text-xs text-muted-foreground">
            Performance chart will be displayed here
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-medium">1Y Return</div>
              <div className="text-lg font-bold text-green-500">+9.5%</div>
            </div>
            <div>
              <div className="text-sm font-medium">IRR</div>
              <div className="text-lg font-bold text-luxury-primary">12.3%</div>
            </div>
            <div>
              <div className="text-sm font-medium">Multiple</div>
              <div className="text-lg font-bold text-luxury-primary">1.2x</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
