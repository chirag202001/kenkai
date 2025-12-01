import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Booking {
  id?: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  service: string;
  role?: string;
  challenge?: string;
  timeline?: string;
  budget?: string;
  created_at?: string;
}

// Get all bookings
export async function getAllBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) throw error;
  return data || [];
}

// Get booked slots for a specific date
export async function getBookedSlots(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('time')
    .eq('date', date);

  if (error) throw error;
  return data?.map(b => b.time) || [];
}

// Create a new booking
export async function createBooking(booking: Booking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      date: booking.date,
      time: booking.time,
      name: booking.name,
      email: booking.email,
      company: booking.company,
      service: booking.service,
      role: booking.role,
      challenge: booking.challenge,
      timeline: booking.timeline,
      budget: booking.budget
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Check if a time slot is available
export async function isSlotAvailable(date: string, time: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('date', date)
    .eq('time', time)
    .maybeSingle();

  if (error) throw error;
  return data === null;
}
