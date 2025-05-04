'use client'

import { useState } from 'react'
import { Contact } from '@/lib/supabase/client'
import ContactList from '@/components/crm/ContactList'
import ContactDetail from '@/components/crm/ContactDetail'
import ContactForm from '@/components/crm/ContactForm'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function CRMPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    setIsDetailOpen(true)
  }

  const handleCreateContact = () => {
    setSelectedContact(null)
    setIsFormOpen(true)
  }

  const handleEditContact = () => {
    setIsDetailOpen(false)
    setIsEditing(true)
    setIsFormOpen(true)
  }

  const handleSubmitContact = async (data: Partial<Contact>) => {
    try {
      const response = await fetch(
        selectedContact ? `/api/contacts/${selectedContact.id}` : '/api/contacts',
        {
          method: selectedContact ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )
      if (!response.ok) throw new Error('Failed to save contact')
      
      // Reset state and refresh the contact list
      setIsFormOpen(false)
      setIsEditing(false)
      setSelectedContact(null)
      // The ContactList component will automatically refresh its data
    } catch (error) {
      console.error('Error saving contact:', error)
    }
  }

  return (
    <div className="min-h-screen bg-matte-black">
      {/* Header */}
      <div className="bg-midnight shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-didot text-gold">Contact Management</h1>
              <p className="mt-1 text-sm font-garamond text-gray-400">
                Manage your network of investors and prospects
              </p>
            </div>
            <button
              onClick={handleCreateContact}
              className="inline-flex items-center px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold font-futura rounded-md transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Contact
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContactList onContactSelect={handleContactSelect} />
      </div>

      {/* Modals */}
      {selectedContact && isDetailOpen && (
        <ContactDetail
          contact={selectedContact}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          onEdit={handleEditContact}
        />
      )}

      <ContactForm
        contact={isEditing ? selectedContact : undefined}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setIsEditing(false)
        }}
        onSubmit={handleSubmitContact}
      />
    </div>
  )
}