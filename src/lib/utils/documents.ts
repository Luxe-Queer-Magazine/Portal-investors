import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

export interface DocumentType {
  id: string
  name: string
  description: string
  required: boolean
  order: number
  category: string
  template?: string
  fields?: Record<string, {
    label: string
    type: 'text' | 'number' | 'date' | 'boolean' | 'file'
    required: boolean
  }>
}

export interface Document {
  id: string
  document_type_id: string
  investor_id: string
  status: 'pending' | 'completed' | 'reviewed' | 'rejected'
  created_at: string
  updated_at: string
  data: Record<string, any>
  files: {
    id: string
    name: string
    url: string
    type: string
    size: number
    created_at: string
  }[]
}

export interface DocumentTemplate {
  id: string
  name: string
  content: string
  variables: string[]
  category: string
  type: 'pdf' | 'docx' | 'xlsx'
}

export class DocumentManager {
  private supabase: ReturnType<typeof createClient>

  constructor() {
    this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  }

  async getDocumentTypes(): Promise<DocumentType[]> {
    const { data, error } = await this.supabase
      .from('document_types')
      .select('*')
      .order('order')

    if (error) throw error
    return data || []
  }

  async getDocuments(investorId: string): Promise<Document[]> {
    const { data, error } = await this.supabase
      .from('documents')
      .select(`
        *,
        files:document_files(
          id,
          name,
          url,
          type,
          size,
          created_at
        )
      `)
      .eq('investor_id', investorId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async createDocument(
    documentTypeId: string,
    investorId: string,
    data: Record<string, any> = {},
    files: File[] = []
  ): Promise<Document> {
    const { data: document, error } = await this.supabase
      .from('documents')
      .insert([{
        document_type_id: documentTypeId,
        investor_id: investorId,
        data,
        status: 'pending'
      }])
      .select()
      .single()

    if (error) throw error

    // Upload files
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const fileName = `${investorId}-${Date.now()}-${file.name}`
        const { error: uploadError } = await this.supabase.storage
          .from('documents')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data: fileData, error: fileError } = await this.supabase.storage
          .from('documents')
          .getPublicUrl(fileName)

        if (fileError) throw fileError

        const fileRecord = {
          document_id: document.id,
          name: file.name,
          url: fileData.publicUrl,
          type: file.type,
          size: file.size
        }

        const { error: insertError } = await this.supabase
          .from('document_files')
          .insert([fileRecord])

        if (insertError) throw insertError

        return fileRecord
      })
    )

    return {
      ...document,
      files: uploadedFiles
    }
  }

  async updateDocumentStatus(
    documentId: string,
    status: Document['status']
  ): Promise<Document> {
    const { data, error } = await this.supabase
      .from('documents')
      .update({ status })
      .eq('id', documentId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async generateDocument(
    templateId: string,
    data: Record<string, any>
  ): Promise<Buffer> {
    // Get template
    const { data: template, error } = await this.supabase
      .from('document_templates')
      .select('*')
      .eq('id', templateId)
      .single()

    if (error) throw error

    // Replace variables in template
    let content = template.content
    template.variables.forEach(variable => {
      const value = data[variable] || ''
      content = content.replace(new RegExp(`{{${variable}}}`, 'g'), value)
    })

    // Generate document based on type
    switch (template.type) {
      case 'pdf':
        return this.generatePDF(content)
      case 'docx':
        return this.generateDOCX(content)
      case 'xlsx':
        return this.generateXLSX(content)
      default:
        throw new Error('Unsupported document type')
    }
  }

  private async generatePDF(content: string): Promise<Buffer> {
    // Implement PDF generation logic
    // This would typically use a library like pdf-lib
    throw new Error('PDF generation not implemented')
  }

  private async generateDOCX(content: string): Promise<Buffer> {
    // Implement DOCX generation logic
    // This would typically use a library like docx
    throw new Error('DOCX generation not implemented')
  }

  private async generateXLSX(content: string): Promise<Buffer> {
    // Implement XLSX generation logic
    // This would typically use a library like xlsx
    throw new Error('XLSX generation not implemented')
  }

  async validateDocument(
    documentId: string,
    documentTypeId: string
  ): Promise<string[]> {
    const { data: documentType } = await this.supabase
      .from('document_types')
      .select('fields')
      .eq('id', documentTypeId)
      .single()

    if (!documentType) {
      throw new Error('Document type not found')
    }

    // Get document data
    const { data: document } = await this.supabase
      .from('documents')
      .select('data')
      .eq('id', documentId)
      .single()

    if (!document) {
      throw new Error('Document not found')
    }

    const errors: string[] = []

    // Validate required fields
    if (documentType.fields) {
      Object.entries(documentType.fields).forEach(([field, config]) => {
        if (config.required && !document.data[field]) {
          errors.push(`Required field: ${config.label}`)
        }
      })
    }

    return errors
  }

  async getDocumentHistory(documentId: string): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('document_history')
      .select('*')
      .eq('document_id', documentId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async addDocumentNote(
    documentId: string,
    note: string,
    userId: string
  ): Promise<void> {
    await this.supabase
      .from('document_history')
      .insert([{
        document_id: documentId,
        user_id: userId,
        note,
        type: 'note'
      }])
  }
}
