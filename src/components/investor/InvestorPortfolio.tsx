import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'

const portfolioData = [
  {
    name: 'Series A',
    allocation: 40,
    value: '$200,000',
    performance: '+8.5%',
    trend: 'up'
  },
  {
    name: 'Series B',
    allocation: 35,
    value: '$175,000',
    performance: '+12.2%',
    trend: 'up'
  },
  {
    name: 'Convertible Note',
    allocation: 15,
    value: '$75,000',
    performance: '+4.1%',
    trend: 'up'
  },
  {
    name: 'Preferred Equity',
    allocation: 10,
    value: '$50,000',
    performance: '+7.8%',
    trend: 'up'
  }
]

export function InvestorPortfolio() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium">Investment Type</div>
        <div className="text-sm font-medium">Allocation</div>
      </div>
      
      {portfolioData.map((item) => (
        <div key={item.name} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-12 bg-luxury-gold rounded-full"></div>
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">{item.value}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-medium">{item.allocation}%</div>
            <div className={`flex items-center text-sm ${
              item.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {item.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {item.performance}
            </div>
          </div>
        </div>
      ))}
      
      <div className="pt-4 mt-4 border-t">
        <div className="flex justify-between items-center">
          <div className="font-medium">Total Portfolio</div>
          <div className="font-medium">$500,000</div>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="text-sm text-muted-foreground">Current Value</div>
          <div className="text-sm text-green-500">$547,500 (+9.5%)</div>
        </div>
      </div>
    </div>
  )
}
