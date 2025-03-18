import { createClient } from '@supabase/supabase-js';

// Read environment variables (make sure these exist in your .env.local file)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseKey);
