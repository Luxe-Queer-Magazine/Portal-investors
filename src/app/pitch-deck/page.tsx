'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: '1',
      type: 'intro',
      content: {
        title: 'Luxe Queer Magazine',
        subtitle: 'Redefining Luxury Through Queer Excellence',
        description: 'Where opulence meets authenticity'
      }
    },
    {
      id: '2',
      type: 'metrics',
      content: {
        marketSize: '$12.4B Global Luxury Publishing',
        targetMarket: '8.7M Global Affluent LGBTQ+',
        projectedGrowth: '7.3% Annual Growth'
      }
    },
    {
      id: '3',
      type: 'team',
      content: {
        leadership: [
          {
            name: 'Octavia Opulence³',
            role: 'AI Editorial Director',
          },
          {
            name: 'Creative Director',
            role: 'Brand & Visual Identity',
          },
          {
            name: 'Tech Director',
            role: 'AI & Platform Innovation',
          }
        ]
      }
    },
    {
      id: '4',
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

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const renderSlideContent = (slide) => {
    switch (slide.type) {
      case 'intro':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gold mb-4">{slide.content.title}</h1>
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">{slide.content.subtitle}</h2>
            <p className="text-xl text-gold/80">{slide.content.description}</p>
          </div>
        )
      case 'metrics':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-wine/20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gold mb-2">Market Size</h3>
              <p className="text-3xl text-white">{slide.content.marketSize}</p>
            </div>
            <div className="bg-wine/20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gold mb-2">Target Market</h3>
              <p className="text-3xl text-white">{slide.content.targetMarket}</p>
            </div>
            <div className="bg-wine/20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gold mb-2">Growth</h3>
              <p className="text-3xl text-white">{slide.content.projectedGrowth}</p>
            </div>
          </div>
        )
      case 'team':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gold text-center mb-8">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {slide.content.leadership.map((member, index) => (
                <div key={index} className="bg-wine/20 p-6 rounded-lg backdrop-blur-sm text-center">
                  <div className="w-24 h-24 mx-auto bg-gold/20 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold text-gold">{member.name}</h3>
                  <p className="text-white">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'financials':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gold text-center mb-8">Financial Projections</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-wine/20 p-4 rounded-lg backdrop-blur-sm text-center">
                <h3 className="text-lg font-medium text-white mb-2">Year 1 Revenue</h3>
                <p className="text-2xl font-bold text-gold">{slide.content.year1Revenue}</p>
              </div>
              <div className="bg-wine/20 p-4 rounded-lg backdrop-blur-sm text-center">
                <h3 className="text-lg font-medium text-white mb-2">Year 3 Revenue</h3>
                <p className="text-2xl font-bold text-gold">{slide.content.year3Revenue}</p>
              </div>
              <div className="bg-wine/20 p-4 rounded-lg backdrop-blur-sm text-center">
                <h3 className="text-lg font-medium text-white mb-2">Subscribers</h3>
                <p className="text-2xl font-bold text-gold">{slide.content.subscribers}</p>
              </div>
              <div className="bg-wine/20 p-4 rounded-lg backdrop-blur-sm text-center">
                <h3 className="text-lg font-medium text-white mb-2">Margins</h3>
                <p className="text-2xl font-bold text-gold">{slide.content.margins}</p>
              </div>
            </div>
          </div>
        )
      case 'investment':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gold text-center mb-8">Investment Opportunity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-wine/20 p-6 rounded-lg backdrop-blur-sm text-center">
                <h3 className="text-xl font-medium text-white mb-2">Raising</h3>
                <p className="text-3xl font-bold text-gold">{slide.content.raising}</p>
              </div>
              <div className="bg-wine/20 p-6 rounded-lg backdrop-blur-sm text-center">
                <h3 className="text-xl font-medium text-white mb-2">Valuation</h3>
                <p className="text-3xl font-bold text-gold">{slide.content.valuation}</p>
              </div>
            </div>
            <div className="bg-wine/20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-medium text-gold mb-4">Use of Funds</h3>
              <ul className="space-y-2">
                {slide.content.useOfFunds.map((item, index) => (
                  <li key={index} className="text-white">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-midnight to-matte-black">
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-8"
            >
              {renderSlideContent(slides[currentSlide])}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-full bg-wine/20 hover:bg-wine/40 disabled:opacity-50 transition-colors"
            title="Previous slide"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gold" />
          </button>
          <div className="font-sans text-gold">
            {currentSlide + 1} / {slides.length}
          </div>
          <button
            type="button"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-full bg-wine/20 hover:bg-wine/40 disabled:opacity-50 transition-colors"
            title="Next slide"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-6 h-6 text-gold" />
          </button>
        </div>
      </div>
    </main>
  )
}
