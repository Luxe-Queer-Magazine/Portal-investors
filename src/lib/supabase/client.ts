import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY
)

export type User = {
  id: string
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'investor' | 'user'
  created_at: string
  updated_at: string
}

export type Investor = {
  id: string
  user_id: string
  company_name?: string
  investment_amount: number
  investment_date: string
  status: 'active' | 'pending' | 'inactive'
  accreditation_status: 'verified' | 'pending' | 'not_verified'
  documents: string[]
  created_at: string
  updated_at: string
}

export type Document = {
  id: string
  investor_id: string
  name: string
  type: string
  status: 'signed' | 'pending_signature' | 'available'
  url: string
  created_at: string
  updated_at: string
}

export type Investment = {
  id: string
  investor_id: string
  amount: number
  type: string
  date: string
  status: string
  created_at: string
  updated_at: string
}

export type Distribution = {
  id: string
  investor_id: string
  amount: number
  date: string
  status: 'pending' | 'completed'
  created_at: string
  updated_at: string
}

export type Activity = {
  id: string
  investor_id: string
  type: 'distribution' | 'document' | 'valuation' | 'notice'
  description: string
  date: string
  amount?: number
  created_at: string
  updated_at: string
}

export type Contact = {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export type CRMActivity = {
  id: string
  contact_id: string
  activity_type: string
  description: string
  status: string
  created_by: string
  created_at: string
  updated_at: string
}

export type Campaign = {
  id: string
  name: string
  subject: string
  content: string
  status: 'draft' | 'scheduled' | 'sent'
  scheduled_for?: string
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

export type PitchSlide = {
  id: string
  type: 'intro' | 'metrics' | 'team' | 'financials' | 'investment'
  content: any
  order: number
}

export type PitchDeck = {
  id: string
  title: string
  description?: string
  version: string
  status: 'draft' | 'published' | 'archived'
  slides: PitchSlide[]
  created_by: string
  created_at: string
  updated_at: string
}
