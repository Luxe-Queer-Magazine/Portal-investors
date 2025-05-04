import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get user session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const status = searchParams.get('status')
    const interest = searchParams.get('interest')
    const search = searchParams.get('search')

    // Build query
    let query = supabase.from('contacts').select('*')

    if (status) {
      query = query.eq('status', status)
    }
    if (interest) {
      query = query.eq('interest_level', interest)
    }
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`)
    }

    // Execute query
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get user session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get request body
    const body = await req.json()
    
    // Validate required fields
    if (!body.full_name || !body.email) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400 }
      )
    }

    // Add metadata
    const contact = {
      ...body,
      created_by: session.user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Insert contact
    const { data, error } = await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}