import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

// Only create the client if both URL and key are available
let supabase;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
} else {
  // Create a mock client or placeholder for development
  console.warn(
    "Using mock Supabase client. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables for production.",
  );
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
      order: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
      }),
    }),
    auth: {
      signInWithPassword: () => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
    channel: (name: string) => ({
      on: (event: string, filter: any, callback: Function) => ({
        subscribe: () => console.log(`Mock subscription to ${name} channel`),
      }),
      subscribe: () => console.log(`Mock subscription to ${name} channel`),
      unsubscribe: () =>
        console.log(`Mock unsubscription from ${name} channel`),
    }),
  } as unknown as ReturnType<typeof createClient<Database>>;
}

export { supabase };
