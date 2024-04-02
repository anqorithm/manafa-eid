import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ngawvmvnnjmbiowdnevf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nYXd2bXZubmptYmlvd2RuZXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4MzczNTUsImV4cCI6MjAyNzQxMzM1NX0.Kz5xUGhbMmiEYu8ZB710AeeedBgOtI4a3HbwSulwfpA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);