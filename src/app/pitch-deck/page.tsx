import { Suspense } from 'react'
import PitchDeckViewer from '@/components/pitch/PitchDeckViewer'

const luxeQueerDeck = {
  id: '1',
  title: 'Luxe Queer Magazine',
  description: 'Luxury publishing for the discerning queer audience',
  version: '2025.1',
  status: 'published',
  created_by: 'admin',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  slides: [
    {
      id: '1',
      order: 1,
      type: 'intro',
      content: {
        subtitle: 'Redefining Luxury Through Queer Excellence',
        description: 'Where opulence meets authenticity'
      }
    },
    {
      id: '2',
      order: 2,
      type: 'metrics',
      content: {
        marketSize: '$12.4B Global Luxury Publishing',
        targetMarket: '8.7M Global Affluent LGBTQ+',
        projectedGrowth: '7.3% Annual Growth'
      }
    },
    {
      id: '3',
      order: 3,
      type: 'team',
      content: {
        leadership: [
          {
            name: 'Octavia Opulence³',
            role: 'AI Editorial Director',
            image: '/avatars/octavia.png'
          },
          {
            name: 'Creative Director',
            role: 'Brand & Visual Identity',
            image: '/avatars/creative.png'
          },
          {
            name: 'Tech Director',
            role: 'AI & Platform Innovation',
            image: '/avatars/tech.png'
          }
        ]
      }
    },
    {
      id: '4',
      order: 4,
      type: 'financials',
      content: {
        year1Revenue: '$1.2M',
        year3Revenue: '$4.8M',
        subscribers: '40K by Year 3',
        margins: '65% Gross Margin'
      }
    },
    {
      id: '5',
      order: 5,
      type: 'investment',
      content: {
        raising: '$1.2M Seed Round',
        valuation: '$6M Pre-money',
        useOfFunds: [
          'Technology Development: $350K',
          'Content Creation: $250K',
          'Marketing & Launch: $300K',
          'Operations & Team: $300K'
        ]
      }
    }
  ]
}

export default function PitchDeckPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-midnight to-matte-black">
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-gold text-xl animate-pulse">
            Loading the future of luxury publishing...
          </div>
        </div>
      }>
        <PitchDeckViewer deck={luxeQueerDeck} />
      </Suspense>
    </main>
  )
}