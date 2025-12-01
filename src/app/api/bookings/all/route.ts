import { NextResponse } from 'next/server';

interface Booking {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  service: string;
  createdAt: string;
}

// This should match the store in the main route
// In production, both would query the same database
let bookingsStore: Booking[] = [];

async function getBookings(): Promise<Booking[]> {
  return bookingsStore;
}

export async function GET() {
  try {
    const bookings = await getBookings();
    
    // Sort by date and time
    bookings.sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return a.date.localeCompare(b.date);
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
