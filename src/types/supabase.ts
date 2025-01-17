export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string
          published_date: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          author_id: string
          published_date?: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author_id?: string
          published_date?: string
          image_url?: string
          created_at?: string
        }
      }
    }
  }
}