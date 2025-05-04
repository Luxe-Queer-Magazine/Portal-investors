'use client'

import { useState } from 'react'
import { Contact } from '@/lib/supabase/client'
import Modal from '@/components/ui/Modal'

interface ContactFormProps {
  contact?: Contact
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<Contact>) => Promise<void>
}

export default function ContactForm({ contact, isOpen, onClose, onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<Partial<Contact>>(
    contact || {
      full_name: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      investment_range: '',
      interest_level: 'medium',
      status: 'lead',
      notes: '',
    }
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error('Error submitting contact:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={contact ? 'Edit Contact' : 'New Contact'}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="col-span-2 space-y-4">
            <h3 className="text-sm font-futura text-verdigris uppercase tracking-wider">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor="full_name" className="block text-sm font-garamond text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md bg-midnight border-verdigris/20 text-gray-200 shadow-sm focus:border-gold focus:ring focus:ring-gold/50 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-garamond text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md bg-midnight border-verdigris/20 text-gray-200 shadow-sm focus:border-gold focus:ring focus:ring-gold/50 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-garamond text-gray-400">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-midnight border-verdigris/20 text-gray-200 shadow-sm focus:border-gold focus:ring focus:ring-gold/50 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="col-span-2 space-y-4">
            <h3 className="text-sm font-futura text-verdigris uppercase tracking-wider">Professional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-garamond text-gray-400">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-midnight border-verdigris/20 text-gray-200 shadow-sm focus:border-gold focus:ring focus:ring-gold/50 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-garamond text-gray-400">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-midnight border-verdigris/20 text-gray-200 shadow-sm focus:border-gold focus:ring focus:ring-gold/50 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Investment Information */}
          <div className="col-span-2 space-y-4">
            <h3 className="text-sm font-futura text-verdigris uppercase tracking-wider">Investment Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="investment_range" className="block text-sm font-garamond text-gray-400">
                  Investment Range
                </label>
                <select
                  id="investment_range"
                  name="investment_range"
                  value={formData.investment_range}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-midnight border-verdigris/20 text-gray-200 shadow-sm focus:border-gold focus:ring focus:ring-gold/50 focus:ring-opacity-50"
                >
                  <option value="">Select Range</option>
                  <option value="$10k-$50k">$10k-$50k</option>
                  <option value="$50k-$100k">$50k-$100k</option>
                  <option value="$100k-$500k">$100k-$500k</option>
                  <option value="$500k+">$500k+</option>
                </select>
              </div>
              <div>
                <label htmlFor="interest_level" className="block text-sm font-garamond text-gray-400">
                  Interest Level
                </label>
                <select
                  id="interest_level"
                  name="interest_level"
                  value={formData.interest_level}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md bg-midnight border-verdigris/20 text-gray-200 shadow-sm focus:border-gold focus:ring focus:ring-gold/50 focus:ring-opacity-50"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-garamond text-gray-400">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md bg-midnight border-verdigris/20 text-gray-200 shadow-sm focus:border-gold focus:ring focus:ring-gold/50 focus:ring-opacity-50"
                >
                  <option value="lead">Lead</option>
                  <option value="prospect">Prospect</option>
                  <option value="investor">Investor</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="col-span-2 space-y-4">
            <h3 className="text-sm font-futura text-verdigris uppercase tracking-wider">Notes</h3>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md bg-midnight border-verdigris/20 text-gray-200 shadow-sm focus:border-gold focus:ring focus:ring-gold/50 focus:ring-opacity-50 resize-none font-garamond"
              placeholder="Add any additional notes about this contact..."
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-futura text-gray-400 hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold font-futura rounded-md transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : contact ? 'Update Contact' : 'Create Contact'}
          </button>
        </div>
      </form>
    </Modal>
  )
}