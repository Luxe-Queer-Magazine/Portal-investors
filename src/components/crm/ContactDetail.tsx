'use client'

import { useState } from 'react'
import { Contact } from '@/lib/supabase/client'
import Modal from '@/components/ui/Modal'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

interface ContactDetailProps {
  contact: Contact
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
}

export default function ContactDetail({ contact, isOpen, onClose, onEdit }: ContactDetailProps) {
  const [notes, setNotes] = useState(contact.notes || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveNotes = async () => {
    setIsSaving(true)
    try {
      await fetch(`/api/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })
    } catch (error) {
      console.error('Error saving notes:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-midnight flex items-center justify-center font-didot text-2xl text-gold">
              {contact.full_name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-didot text-gold">{contact.full_name}</h2>
              {contact.position && contact.company && (
                <p className="text-gray-400 font-garamond">
                  {contact.position} at {contact.company}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onEdit}
            className="p-2 rounded-full hover:bg-verdigris/10 text-gray-400 hover:text-gold transition-colors"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-3">
            <h3 className="text-sm font-futura text-verdigris uppercase tracking-wider">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-200">
                <EnvelopeIcon className="h-5 w-5 text-gold" />
                <a href={`mailto:${contact.email}`} className="hover:text-gold transition-colors">
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div className="flex items-center gap-2 text-gray-200">
                  <PhoneIcon className="h-5 w-5 text-gold" />
                  <a href={`tel:${contact.phone}`} className="hover:text-gold transition-colors">
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.company && (
                <div className="flex items-center gap-2 text-gray-200">
                  <BuildingOfficeIcon className="h-5 w-5 text-gold" />
                  {contact.company}
                </div>
              )}
            </div>
          </div>

          {/* Investment Details */}
          <div className="col-span-2 space-y-3">
            <h3 className="text-sm font-futura text-verdigris uppercase tracking-wider">Investment Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400">Interest Level</div>
                <div className="font-didot text-gold">{contact.interest_level}</div>
              </div>
              {contact.investment_range && (
                <div>
                  <div className="text-sm text-gray-400">Investment Range</div>
                  <div className="font-didot text-gold">{contact.investment_range}</div>
                </div>
              )}
              <div>
                <div className="text-sm text-gray-400">Status</div>
                <div className="font-didot text-gold">{contact.status}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Last Contact</div>
                <div className="font-didot text-gold">
                  {contact.last_contacted 
                    ? new Date(contact.last_contacted).toLocaleDateString() 
                    : 'Never'}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="col-span-2 space-y-3">
            <h3 className="text-sm font-futura text-verdigris uppercase tracking-wider">Notes</h3>
            <div className="relative">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleSaveNotes}
                className="w-full h-32 bg-midnight rounded-lg p-3 text-gray-200 font-garamond resize-none focus:ring-2 focus:ring-gold/50 focus:outline-none"
                placeholder="Add notes about this contact..."
              />
              {isSaving && (
                <div className="absolute bottom-2 right-2 text-xs text-gray-400 italic">
                  Saving...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}