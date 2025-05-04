import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Get CRM analytics data
  const { data: contacts, error: contactsError } = await supabase
    .from('contacts')
    .select('*')
  
  if (contactsError) {
    return NextResponse.json({ error: contactsError.message }, { status: 500 })
  }
  
  const { data: activities, error: activitiesError } = await supabase
    .from('crm_activities')
    .select('*')
  
  if (activitiesError) {
    return NextResponse.json({ error: activitiesError.message }, { status: 500 })
  }
  
  // Calculate analytics
  const totalContacts = contacts.length
  const activeContacts = contacts.filter(c => c.status === 'active').length
  const inactiveContacts = contacts.filter(c => c.status === 'inactive').length
  const totalActivities = activities.length
  
  // Group activities by type
  const activityTypes = activities.reduce((acc, activity) => {
    acc[activity.activity_type] = (acc[activity.activity_type] || 0) + 1
    return acc
  }, {})
  
  return NextResponse.json({
    data: {
      totalContacts,
      activeContacts,
      inactiveContacts,
      totalActivities,
      activityTypes
    }
  })
}
