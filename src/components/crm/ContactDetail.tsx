import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, Trash2, Mail, Phone, Building, Calendar } from 'lucide-react'

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

interface ContactDetailProps {
  contact: Contact
  onEdit: () => void
  onDelete: () => void
}

export function ContactDetail({ contact, onEdit, onDelete }: ContactDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{contact.name}</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-500" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{contact.email}</span>
              </div>
              
              {contact.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{contact.phone}</span>
                </div>
              )}
              
              {contact.company && (
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <span>{contact.company}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Added on {new Date(contact.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Status</h4>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  contact.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {contact.status}
                </span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Activity</h4>
                <p className="text-sm">No recent activity</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
