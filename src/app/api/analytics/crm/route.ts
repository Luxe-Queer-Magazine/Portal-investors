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

    // Get date range from query params
    const searchParams = req.nextUrl.searchParams
    const startDate = searchParams.get('start_date') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const endDate = searchParams.get('end_date') || new Date().toISOString()

    // Fetch all required analytics data
    const [
      contactStats,
      statusBreakdown,
      interestLevels,
      investmentRanges,
      recentActivity,
      conversionMetrics
    ] = await Promise.all([
      // Overall contact statistics
      supabase.from('contacts')
        .select('*', { count: 'exact' })
        .gte('created_at', startDate)
        .lte('created_at', endDate),

      // Status breakdown
      supabase.from('contacts')
        .select('status, count', { count: 'exact' })
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .group('status'),

      // Interest level distribution
      supabase.from('contacts')
        .select('interest_level, count', { count: 'exact' })
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .group('interest_level'),

      // Investment range distribution
      supabase.from('contacts')
        .select('investment_range, count', { count: 'exact' })
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .not('investment_range', 'is', null)
        .group('investment_range'),

      // Recent activity (last updated contacts)
      supabase.from('contacts')
        .select('id, full_name, status, updated_at')
        .order('updated_at', { ascending: false })
        .limit(5),

      // Conversion metrics (leads to investors)
      supabase.from('contacts')
        .select('status, created_at')
        .in('status', ['lead', 'prospect', 'investor'])
        .gte('created_at', startDate)
        .lte('created_at', endDate)
    ])

    // Calculate conversion rates
    const conversions = conversionMetrics.data ? {
      total: conversionMetrics.data.length,
      leads: conversionMetrics.data.filter(c => c.status === 'lead').length,
      prospects: conversionMetrics.data.filter(c => c.status === 'prospect').length,
      investors: conversionMetrics.data.filter(c => c.status === 'investor').length,
    } : null

    // Calculate conversion rates
    const conversionRates = conversions ? {
      leadToProspect: conversions.prospects / (conversions.leads || 1) * 100,
      prospectToInvestor: conversions.investors / (conversions.prospects || 1) * 100,
      overallConversion: conversions.investors / (conversions.total || 1) * 100
    } : null

    // Calculate potential investment volume
    const potentialInvestment = investmentRanges.data?.reduce((acc, range) => {
      const count = range.count as number
      let amount = 0
      
      switch(range.investment_range) {
        case '$10k-$50k':
          amount = 30000 * count // average of range
          break
        case '$50k-$100k':
          amount = 75000 * count
          break
        case '$100k-$500k':
          amount = 300000 * count
          break
        case '$500k+':
          amount = 750000 * count // conservative estimate
          break
      }
      
      return acc + amount
    }, 0)

    return NextResponse.json({
      overview: {
        totalContacts: contactStats.count,
        potentialInvestmentVolume: potentialInvestment,
        averageInvestmentSize: potentialInvestment ? potentialInvestment / (contactStats.count || 1) : 0
      },
      statusBreakdown: statusBreakdown.data?.reduce((acc, item) => ({
        ...acc,
        [item.status]: item.count
      }), {}),
      interestLevels: interestLevels.data?.reduce((acc, item) => ({
        ...acc,
        [item.interest_level]: item.count
      }), {}),
      investmentRanges: investmentRanges.data?.reduce((acc, item) => ({
        ...acc,
        [item.investment_range]: item.count
      }), {}),
      conversionMetrics: {
        raw: conversions,
        rates: conversionRates
      },
      recentActivity: recentActivity.data,
      dateRange: {
        start: startDate,
        end: endDate
      }
    })
  } catch (error) {
    console.error('Error fetching CRM analytics:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}