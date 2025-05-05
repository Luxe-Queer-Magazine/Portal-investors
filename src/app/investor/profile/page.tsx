'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Shield, 
  Lock, 
  Bell, 
  CreditCard,
  Save,
  Edit
} from 'lucide-react'

// Mock investor profile data
const investorProfile = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  company: 'Smith Ventures LLC',
  address: {
    street: '123 Investment Ave',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States'
  },
  taxId: 'XX-XXXXXXX',
  accreditationStatus: 'Verified',
  accreditationDate: '2025-01-15',
  investorType: 'Individual',
  communicationPreferences: {
    emailUpdates: true,
    documentNotifications: true,
    marketingCommunications: false,
    quarterlyReports: true
  },
  bankInformation: {
    bankName: 'First National Bank',
    accountType: 'Checking',
    accountNumber: '****4567',
    routingNumber: '****8901'
  }
}

export default function InvestorProfilePage() {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(investorProfile)

  const handleSave = () => {
    // In a real app, you would save the profile data to the backend here
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investor Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="luxury" size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="accreditation">Accreditation</TabsTrigger>
          <TabsTrigger value="banking">Banking Information</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your personal and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input id="name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                    ) : (
                      <span>{profile.name}</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                    ) : (
                      <span>{profile.email}</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input id="phone" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                    ) : (
                      <span>{profile.phone}</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input id="company" value={profile.company} onChange={(e) => setProfile({...profile, company: e.target.value})} />
                    ) : (
                      <span>{profile.company}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Address</Label>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <Input placeholder="Street" value={profile.address.street} onChange={(e) => setProfile({...profile, address: {...profile.address, street: e.target.value}})} />
                      <Input placeholder="City" value={profile.address.city} onChange={(e) => setProfile({...profile, address: {...profile.address, city: e.target.value}})} />
                      <Input placeholder="State" value={profile.address.state} onChange={(e) => setProfile({...profile, address: {...profile.address, state: e.target.value}})} />
                      <Input placeholder="ZIP" value={profile.address.zip} onChange={(e) => setProfile({...profile, address: {...profile.address, zip: e.target.value}})} />
                      <Input placeholder="Country" value={profile.address.country} onChange={(e) => setProfile({...profile, address: {...profile.address, country: e.target.value}})} />
                    </div>
                  ) : (
                    <div>
                      <p>{profile.address.street}</p>
                      <p>{profile.address.city}, {profile.address.state} {profile.address.zip}</p>
                      <p>{profile.address.country}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accreditation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accreditation Status</CardTitle>
              <CardDescription>
                Your investor accreditation information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Accreditation Status</Label>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {profile.accreditationStatus}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Verification Date</Label>
                  <div className="flex items-center space-x-2">
                    <span>{new Date(profile.accreditationDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Investor Type</Label>
                  <div className="flex items-center space-x-2">
                    <span>{profile.investorType}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Tax ID</Label>
                  <div className="flex items-center space-x-2">
                    <span>{profile.taxId}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Accreditation status is verified by our compliance team. If you need to update your accreditation information, please contact support.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="banking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Banking Information</CardTitle>
              <CardDescription>
                Your banking details for distributions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.bankInformation.bankName}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="flex items-center space-x-2">
                    <span>{profile.bankInformation.accountType}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <div className="flex items-center space-x-2">
                    <span>{profile.bankInformation.accountNumber}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Routing Number</Label>
                  <div className="flex items-center space-x-2">
                    <span>{profile.bankInformation.routingNumber}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Update Banking Information
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
              <CardDescription>
                Manage how we communicate with you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about your investments via email
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profile.communicationPreferences.emailUpdates}
                    onChange={(e) => setProfile({
                      ...profile, 
                      communicationPreferences: {
                        ...profile.communicationPreferences,
                        emailUpdates: e.target.checked
                      }
                    })}
                    className="h-4 w-4"
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Document Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when new documents are available
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profile.communicationPreferences.documentNotifications}
                    onChange={(e) => setProfile({
                      ...profile, 
                      communicationPreferences: {
                        ...profile.communicationPreferences,
                        documentNotifications: e.target.checked
                      }
                    })}
                    className="h-4 w-4"
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing communications about new opportunities
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profile.communicationPreferences.marketingCommunications}
                    onChange={(e) => setProfile({
                      ...profile, 
                      communicationPreferences: {
                        ...profile.communicationPreferences,
                        marketingCommunications: e.target.checked
                      }
                    })}
                    className="h-4 w-4"
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Quarterly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive quarterly performance reports
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profile.communicationPreferences.quarterlyReports}
                    onChange={(e) => setProfile({
                      ...profile, 
                      communicationPreferences: {
                        ...profile.communicationPreferences,
                        quarterlyReports: e.target.checked
                      }
                    })}
                    className="h-4 w-4"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span>••••••••••••</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Two-Factor Authentication</Label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span>Not Enabled</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Login History</Label>
                  <Button variant="outline" size="sm">
                    View Login History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
