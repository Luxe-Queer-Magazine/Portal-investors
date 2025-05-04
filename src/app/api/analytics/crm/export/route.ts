import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { generateReport, ExportOptions } from '@/lib/utils/export'

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
    const format = searchParams.get('format') || 'csv'
    const filename = searchParams.get('filename') || 'luxe-queer-crm'
    const status = searchParams.get('status')
    const interest = searchParams.get('interest')
    const investment = searchParams.get('investment')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    const include = searchParams.getAll('include')
    const exclude = searchParams.getAll('exclude')
    const maxRecords = searchParams.get('max_records')
      ? parseInt(searchParams.get('max_records')!)
      : undefined

    // Build query
    let query = supabase
      .from('contacts')
      .select(`
        id,
        full_name,
        email,
        phone,
        company,
        title,
        status,
        interest_level,
        investment_range,
        created_at,
        updated_at,
        notes,
        last_contacted,
        source,
        tags,
        custom_fields
      `)

    // Apply filters
    if (status) query = query.eq('status', status)
    if (interest) query = query.eq('interest_level', interest)
    if (investment) query = query.eq('investment_range', investment)
    if (startDate) query = query.gte('created_at', startDate)
    if (endDate) query = query.lte('created_at', endDate)
    if (maxRecords) query = query.limit(maxRecords)

    // Get data
    const { data, error } = await query
    if (error) throw error

    // Generate report
    const options: ExportOptions = {
      format: format as 'csv' | 'pdf' | 'xlsx' | 'json',
      filename,
      include,
      exclude,
      maxRecords
    }

    const report = await generateReport(data, options)

    // Create response
    const response = new NextResponse(report.buffer)
    response.headers.set('Content-Type', report.contentType)
    response.headers.set(
      'Content-Disposition',
      `attachment; filename=${report.filename}`
    )

    return response
  } catch (error) {
    console.error('Error generating report:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate report' },
      { status: 500 }
    )
  }
}
