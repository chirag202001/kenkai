-- Create bookings table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  service TEXT NOT NULL,
  role TEXT,
  challenge TEXT,
  timeline TEXT,
  budget TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT unique_booking UNIQUE (date, time)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later)
CREATE POLICY "Allow all access to bookings" ON bookings
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: Create a policy for anonymous access (if you want public read access)
-- CREATE POLICY "Allow anonymous read access" ON bookings
--   FOR SELECT
--   USING (true);
