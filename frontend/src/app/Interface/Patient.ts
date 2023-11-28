export interface Patient {
  id: string
  name: string
  responsible: string
  enabled: boolean
  phone: string
  created_at: Date
  disable_data: Date | null
}