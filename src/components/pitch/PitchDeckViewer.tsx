'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
// Define types locally to avoid dependency issues
interface PitchSlide {
  id: string
  type: string
  content: any
  order: number
}

interface PitchDeck {
  id: string
  title: string
  description?: string
  version: string
  status?: string
  slides: PitchSlide[]
  created_by?: string
  created_at: string
  updated_at: string
}

interface PitchDeckViewerProps {
  deck: PitchDeck
}

export default function PitchDeckViewer({ deck }: PitchDeckViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < deck.slides.length - 1) {
      setCurrentSlide(curr => curr + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1)
    }
  }

  const renderSlideContent = (slide: PitchSlide) => {
    switch (slide.type) {
      case 'intro':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-serif text-6xl text-gold text-center"
            >
              {deck.title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-body text-2xl text-lavender"
            >
              {slide.content.subtitle}
            </motion.p>
          </div>
        )

      case 'metrics':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-12">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif text-4xl text-gold mb-8"
            >
              Market Opportunity
            </motion.h2>
            <div className="grid grid-cols-3 gap-8">
              {Object.entries(slide.content).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <p className="text-3xl font-sans text-verdigris mb-2">{value}</p>
                  <p className="text-sm font-body text-lavender">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'team':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif text-4xl text-gold mb-12"
            >
              Leadership Team
            </motion.h2>
            <div className="grid grid-cols-3 gap-8">
              {slide.content.leadership.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center p-6 bg-wine/10 rounded-lg"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-lavender/20" />
                  <h3 className="font-sans text-xl text-gold mb-2">{member.name}</h3>
                  <p className="font-body text-sm text-lavender">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'financials':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif text-4xl text-gold mb-12"
            >
              Financial Overview
            </motion.h2>
            <div className="grid grid-cols-2 gap-12 w-full max-w-3xl">
              {Object.entries(slide.content).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-midnight/50 rounded-lg"
                >
                  <p className="text-4xl font-sans text-verdigris mb-2">{value}</p>
                  <p className="text-sm font-body text-lavender">
                    {key.replace(/([A-Z])/g, ' $1')
                       .replace(/^\w/, c => c.toUpperCase())
                       .replace(/\d+/g, ' $&')}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'investment':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif text-4xl text-gold mb-12"
            >
              Investment Opportunity
            </motion.h2>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-center p-6 bg-wine/20 rounded-lg"
              >
                <p className="text-4xl font-sans text-gold mb-2">{slide.content.raising}</p>
                <p className="text-sm font-body text-lavender">Raising</p>
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center p-6 bg-wine/20 rounded-lg"
              >
                <p className="text-4xl font-sans text-gold mb-2">{slide.content.valuation}</p>
                <p className="text-sm font-body text-lavender">Valuation</p>
              </motion.div>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h3 className="font-sans text-xl text-verdigris mb-4">Use of Funds</h3>
              <ul className="space-y-2">
                {slide.content.useOfFunds.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="font-body text-lavender"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-lavender">Slide content not available</p>
          </div>
        )
    }
  }

  return (
    <div className="relative h-screen bg-matte-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="h-full p-12"
        >
          {deck.slides[currentSlide] && renderSlideContent(deck.slides[currentSlide])}
        </motion.div>
      </AnimatePresence>

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
          {currentSlide + 1} / {deck.slides.length}
        </div>
        <button
          type="button"
          onClick={nextSlide}
          disabled={currentSlide === deck.slides.length - 1}
          className="p-2 rounded-full bg-wine/20 hover:bg-wine/40 disabled:opacity-50 transition-colors"
          title="Next slide"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6 text-gold" />
        </button>
      </div>
    </div>
  )
}