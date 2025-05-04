'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ContactList } from '@/components/crm/ContactList'
import { ContactDetail } from '@/components/crm/ContactDetail'
import { ContactForm } from '@/components/crm/ContactForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, RefreshCw, Download } from 'lucide-react'

// Define the Contact type
interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at?: string
}

export default function CRMPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/contacts')
      const data = await response.json()
      setContacts(data.data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact)
  }

  const handleAddContact = () => {
    setIsEditing(false)
    setSelectedContact(undefined)
    setIsFormOpen(true)
  }

  const handleEditContact = (contact: Contact) => {
    setIsEditing(true)
    setSelectedContact(contact)
    setIsFormOpen(true)
  }

  const handleDeleteContact = async (id: string) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      })
      
      // Refresh contacts list
      fetchContacts()
      
      // Clear selection if the deleted contact was selected
      if (selectedContact?.id === id) {
        setSelectedContact(undefined)
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  const handleSaveContact = async (contactData: Partial<Contact>) => {
    try {
      if (isEditing && selectedContact) {
        // Update existing contact
        await fetch(`/api/contacts/${selectedContact.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        })
      } else {
        // Create new contact
        await fetch('/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        })
      }
      
      // Refresh contacts list
      fetchContacts()
      setIsFormOpen(false)
    } catch (error) {
      console.error('Error saving contact:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">CRM</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchContacts}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleAddContact}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      <ContactForm
        contact={isEditing ? selectedContact : undefined}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
        }}
        onSave={handleSaveContact}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactList
              contacts={contacts}
              isLoading={isLoading}
              selectedContactId={selectedContact?.id}
              onSelectContact={handleSelectContact}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContact ? (
              <ContactDetail
                contact={selectedContact}
                onEdit={() => handleEditContact(selectedContact)}
                onDelete={() => handleDeleteContact(selectedContact.id)}
              />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                Select a contact to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
