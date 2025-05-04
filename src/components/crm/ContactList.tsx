import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: 'active' | 'inactive'
  created_at: string
}

interface ContactListProps {
  contacts: Contact[]
  isLoading: boolean
  selectedContactId?: string
  onSelectContact: (contact: Contact) => void
}

export function ContactList({ contacts, isLoading, selectedContactId, onSelectContact }: ContactListProps) {
  if (isLoading) {
    return <div className="py-4 text-center text-muted-foreground">Loading contacts...</div>
  }

  if (contacts.length === 0) {
    return <div className="py-4 text-center text-muted-foreground">No contacts found</div>
  }

  return (
    <div className="max-h-[500px] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow 
              key={contact.id}
              className={`cursor-pointer ${selectedContactId === contact.id ? 'bg-muted' : ''}`}
              onClick={() => onSelectContact(contact)}
            >
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  contact.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {contact.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
