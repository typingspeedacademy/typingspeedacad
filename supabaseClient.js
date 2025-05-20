import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// User's Supabase Project URL and Anon Key
const supabaseUrl = 'https://uczbnyiglcswxjaqswpy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjemJueWlnbGNzd3hqYXFzd3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0ODA4MTYsImV4cCI6MjA2MzA1NjgxNn0.qwquQc1h36tVMeUSq3MGIA3B99tYClVpEU5w1RwOLPs';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase URL or Anon Key is missing.');
  console.error('Please check your Supabase project settings and update supabaseClient.js');
  // For a real application, you might want to throw an error here or exit the process
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };