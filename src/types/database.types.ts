export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Services: {
        Row: {
          id: string;
          name: string;
          description: string;
          technical_skills_tools: string[] | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          technical_skills_tools?: string[] | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          technical_skills_tools?: string[] | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      ServiceDetails: {
        Row: {
          id: string;
          name: string;
          description: string;
          graphic_design_portfolio: string[] | null;
          service_id: string;
          details: string | null;
          long_description: string | null;
          process: Json[] | null;
          benefits: string[] | null;
          cta: Json | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          graphic_design_portfolio?: string[] | null;
          service_id: string;
          details?: string | null;
          long_description?: string | null;
          process?: Json[] | null;
          benefits?: string[] | null;
          cta?: Json | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          graphic_design_portfolio?: string[] | null;
          service_id?: string;
          details?: string | null;
          long_description?: string | null;
          process?: Json[] | null;
          benefits?: string[] | null;
          cta?: Json | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      FAQs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          service_id: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          service_id?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          service_id?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
    };
  };
}
