import { createClient } from '@supabase/supabase-js';

// Using the provided credentials for the demo project
// In a production environment, these should be strictly managed via environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xabtsmdnabnxabghtyek.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_FyMCVsOuhUyPDmj06hu_JQ_NZWhhObx';

export const supabase = createClient(supabaseUrl, supabaseKey);
