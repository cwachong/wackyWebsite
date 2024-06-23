
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lmohwkqevvfiogfbcczr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtb2h3a3FldnZmaW9nZmJjY3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5OTU1NzgsImV4cCI6MjAzMTU3MTU3OH0.FfU3_Ooa7JA8g8G8Z0D0JJ0Hqmpq2GtODWnw8cvFs5A';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function insertRow(row) {
    const { data, error } = await supabase
      .from('whisky_reviews')
      .insert([row])
    
    if (error) console.error('Error adding row:', error)
    else console.log('Item inserted:', data)
  }

  async function getRows() {
    const { data, error } = await supabase
      .from('whisky_reviews')
      .select('*')
    
    if (error) console.error('Error fetching rows:', error)
    else console.log('Items fetched:', data)
  }

  // TODO: Add functionality for user to update their reviews
  async function updateItem(id, updates) {
    const { data, error } = await supabase
      .from('your_table_name')
      .update(updates)
      .eq('id', id)
    
    if (error) console.error('Error updating item:', error)
    else console.log('Item updated:', data)
  }

  // TODO: Allow for users to delete their reviews
  async function deleteItem(id) {
    const { data, error } = await supabase
      .from('your_table_name')
      .delete()
      .eq('id', id)
    
    if (error) console.error('Error deleting item:', error)
    else console.log('Item deleted:', data)
  }