
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lmohwkqevvfiogfbcczr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtb2h3a3FldnZmaW9nZmJjY3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5OTU1NzgsImV4cCI6MjAzMTU3MTU3OH0.FfU3_Ooa7JA8g8G8Z0D0JJ0Hqmpq2GtODWnw8cvFs5A';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);