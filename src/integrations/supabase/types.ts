export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      flavors: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_dairy_free: boolean | null
          is_gluten_free: boolean | null
          is_new: boolean | null
          is_popular: boolean | null
          name: string
          name_en: string
          price: number
          price_usd: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_dairy_free?: boolean | null
          is_gluten_free?: boolean | null
          is_new?: boolean | null
          is_popular?: boolean | null
          name: string
          name_en: string
          price: number
          price_usd: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_dairy_free?: boolean | null
          is_gluten_free?: boolean | null
          is_new?: boolean | null
          is_popular?: boolean | null
          name?: string
          name_en?: string
          price?: number
          price_usd?: number
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          created_at: string | null
          user_id: string
          customer_name: string
          email: string
          phone: string
          address: string
          shipping_method: "standard" | "express"
          shipping_fee: number
          shipping_fee_usd: number
          subtotal: number
          subtotal_usd: number
          total: number
          total_usd: number
          payment_method: "momo" | "qr"
          payment_status: string
          order_status_id: number
          updated_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          user_id: string
          customer_name: string
          email: string
          phone: string
          address: string
          shipping_method: "standard" | "express"
          shipping_fee: number
          shipping_fee_usd: number
          subtotal: number
          subtotal_usd: number
          total: number
          total_usd: number
          payment_method: "momo" | "qr"
          payment_status: string
          order_status_id?: number
          updated_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          user_id?: string
          customer_name?: string
          email?: string
          phone?: string
          address?: string
          shipping_method?: "standard" | "express"
          shipping_fee?: number
          shipping_fee_usd?: number
          subtotal?: number
          subtotal_usd?: number
          total?: number
          total_usd?: number
          payment_method?: "momo" | "qr"
          payment_status?: string
          order_status_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_order_status_id_fkey"
            columns: ["order_status_id"]
            isOneToOne: false
            referencedRelation: "order_status_lov"
            referencedColumns: ["id"]
          }
        ]
      }
      order_items: {
        Row: {
          id: string
          created_at: string | null
          order_id: string
          flavor_id: string
          quantity: number
          price: number
          price_usd: number
          total: number
          total_usd: number
        }
        Insert: {
          id?: string
          created_at?: string | null
          order_id: string
          flavor_id: string
          quantity: number
          price: number
          price_usd: number
          total: number
          total_usd: number
        }
        Update: {
          id?: string
          created_at?: string | null
          order_id?: string
          flavor_id?: string
          quantity?: number
          price?: number
          price_usd?: number
          total?: number
          total_usd?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_flavor_id_fkey"
            columns: ["flavor_id"]
            isOneToOne: false
            referencedRelation: "flavors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      order_status_lov: {
        Row: {
          id: number
          description_en: string
          description_vi: string
        }
        Insert: {
          id: number
          description_en: string
          description_vi: string
        }
        Update: {
          id?: number
          description_en?: string
          description_vi?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      // order_status: "pending" | "processing" | "completed" | "cancelled"
      payment_method: "momo" | "qr"
      shipping_method: "standard" | "express"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
