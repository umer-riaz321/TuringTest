export interface Call {
  id: string
  direction: String
  from: String
  to: String
  duration: string
  is_archived: Boolean
  call_type: String
  via: String
  created_at: String
  notes: Array<note>
}

export interface note {
  id: string
  content: String
}