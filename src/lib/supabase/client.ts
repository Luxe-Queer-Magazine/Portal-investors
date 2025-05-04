import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Database types
export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: 'investor' | 'admin' | 'member'
  subscription_tier?: string
  subscription_status: 'active' | 'inactive' | 'pending' | 'cancelled'
  created_at: string
  updated_at: string
}

export type Subscription = {
  id: string
  user_id: string
  tier_id: string
  status: 'active' | 'cancelled' | 'pending'
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

export type Contact = {
  id: string
  full_name: string
  email: string
  phone?: string
  company?: string
  position?: string
  investment_range?: string
  interest_level: 'high' | 'medium' | 'low'
  status: 'lead' | 'prospect' | 'investor' | 'declined'
  notes?: string
  last_contacted?: string
  created_at: string
  updated_at: string
  assigned_to?: string
}

export type Document = {
  id: string
  title: string
  type: 'pitch_deck' | 'financial' | 'legal' | 'marketing'
  version: string
  status: 'draft' | 'published' | 'archived'
  access_level: 'public' | 'investor' | 'admin'
  file_url: string
  created_by: string
  created_at: string
  updated_at: string
}

export type DocumentAccess = {
  id: string
  document_id: string
  user_id: string
  access_type: 'view' | 'edit'
  last_accessed?: string
  created_at: string
}

export type MarketingCampaign = {
  id: string
  name: string
  type: 'email' | 'event' | 'direct'
  status: 'draft' | 'scheduled' | 'active' | 'completed'
  target_audience: string[]
  content: any
  scheduled_at?: string
  sent_at?: string
  created_at: string
  updated_at: string
}

export type CampaignAnalytics = {
  campaign_id: string
  total_sent: number
  opened: number
  clicked: number
  converted: number
  unsubscribed: number
  updated_at: string
}

// Helper functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data as Profile
}

export const getSubscription = async (userId: string) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error) throw error
  return data as Subscription
}

export const getContacts = async (filters?: Partial<Contact>) => {
  let query = supabase.from('contacts').select('*')
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) query = query.eq(key, value)
    })
  }
  
  const { data, error } = await query
  if (error) throw error
  return data as Contact[]
}

export const getDocuments = async (accessLevel: Document['access_level'], userId: string) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .or(`access_level.eq.${accessLevel},access_level.eq.public`)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Document[]
}