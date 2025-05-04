'use client'

import { useState, useEffect } from 'react'
import { Contact } from '@/lib/supabase/client'
import DataTable from '@/components/ui/DataTable'
import { CalendarIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

interface ContactListProps {
  onContactSelect: (contact: Contact) => void
}

const statusColors = {
  lead: 'bg-lavender/20 text-lavender',
  prospect: 'bg-verdigris/20 text-verdigris',
  investor: 'bg-gold/20 text-gold',
  declined: 'bg-wine-red/20 text-wine-red',
}

const interestColors = {
  high: 'text-gold',
  medium: 'text-verdigris',
  low: 'text-gray-400',
}

export default function ContactList({ onContactSelect }: ContactListProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contacts')
        const data = await response.json()
        setContacts(data)
      } catch (error) {
        console.error('Error fetching contacts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  const columns = [
    {
      key: 'full_name',
      title: 'Name',
      sortable: true,
      render: (value: string, contact: Contact) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-midnight flex items-center justify-center font-didot text-gold">
            {value.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-didot text-gold">{value}</div>
            <div className="text-xs text-gray-400">{contact.company}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: keyof typeof statusColors) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-futura ${statusColors[value]}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: 'interest_level',
      title: 'Interest',
      sortable: true,
      render: (value: keyof typeof interestColors) => (
        <span className={`font-futura ${interestColors[value]}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: 'email',
      title: 'Contact',
      render: (value: string, contact: Contact) => (
        <div className="flex items-center gap-4">
          <a href={`mailto:${value}`} className="text-gray-400 hover:text-gold">
            <EnvelopeIcon className="h-5 w-5" />
          </a>
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="text-gray-400 hover:text-gold">
              <PhoneIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      ),
    },
    {
      key: 'last_contacted',
      title: 'Last Contact',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2 text-gray-400">
          <CalendarIcon className="h-5 w-5" />
          {value ? new Date(value).toLocaleDateString() : 'Never'}
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gold animate-pulse font-didot">Loading contacts...</div>
      </div>
    )
  }

  return (
    <div className="bg-midnight/50 rounded-lg shadow-xl">
      <DataTable
        columns={columns}
        data={contacts}
        onRowClick={onContactSelect}
        keyExtractor={(contact) => contact.id}
        emptyMessage="No contacts found. Add your first contact to get started."
      />
    </div>
  )
}