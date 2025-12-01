import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

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

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create data directory:', err);
  }
}

async function getBookings(): Promise<Booking[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveBookings(bookings: Booking[]) {
  await ensureDataDir();
  await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

// GET: Check available slots for a specific date
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const bookings = await getBookings();
    const bookedSlots = bookings
      .filter(b => b.date === date)
      .map(b => b.time);

    return NextResponse.json({ bookedSlots });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST: Create a new booking
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, time, name, email, company, service, challenge, role, timeline, budget } = body;

    // Validate required fields
    if (!date || !time || !name || !email || !company || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const bookings = await getBookings();

    // Check if slot is already booked
    const isSlotTaken = bookings.some(
      b => b.date === date && b.time === time
    );

    if (isSlotTaken) {
      return NextResponse.json(
        { error: 'This time slot is already booked. Please select another time.' },
        { status: 409 }
      );
    }

    // Create new booking
    const newBooking: Booking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date,
      time,
      name,
      email,
      company,
      service,
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    await saveBookings(bookings);

    // Send confirmation email (optional - using existing email setup)
    try {
      await sendBookingConfirmation({ 
        ...newBooking, 
        challenge, 
        role, 
        timeline, 
        budget 
      });
    } catch (emailError) {
      console.error('Failed to send booking confirmation email:', emailError);
      // Continue - don't fail the booking if email fails
    }

    return NextResponse.json({ 
      success: true, 
      booking: newBooking 
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

async function sendBookingConfirmation(data: any) {
  const nodemailer = require('nodemailer');
  
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_EMAIL_TO || 'hello@kenkailabs.com';
  const from = process.env.CONTACT_EMAIL_FROM || user || 'noreply@kenkailabs.com';

  if (!host || !user || !pass) {
    console.log('Booking confirmation logged (SMTP not configured):', data);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    const dateObj = new Date(data.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    await transporter.sendMail({
      from,
      to,
      subject: `New Booking: ${data.service} - ${data.company}`,
      text: `
New Booking Confirmed

Service: ${data.service}
Date: ${formattedDate}
Time: ${data.time} IST

Client Details:
Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Role: ${data.role || 'Not provided'}

Challenge: ${data.challenge || 'Not provided'}
Timeline: ${data.timeline || 'Not provided'}
Budget: ${data.budget || 'Not provided'}

Booking ID: ${data.id}
Booked at: ${new Date(data.createdAt).toLocaleString()}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Booking Confirmed</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Service Details</h3>
            <p><strong>Service:</strong> ${data.service}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${data.time} IST</p>
          </div>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Company:</strong> ${data.company}</p>
            ${data.role ? `<p><strong>Role:</strong> ${data.role}</p>` : ''}
          </div>
          
          ${data.challenge ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Challenge:</h3>
            <p style="white-space: pre-wrap;">${data.challenge}</p>
          </div>
          ` : ''}
          
          ${data.timeline || data.budget ? `
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
            ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
          </div>
          ` : ''}
          
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">Booking ID: ${data.id}</p>
          <p style="color: #6b7280; font-size: 12px;">Booked at: ${new Date(data.createdAt).toLocaleString()}</p>
        </div>
      `,
      replyTo: data.email
    });

    console.log('Booking confirmation email sent');
  } catch (err) {
    console.error('Failed to send booking email:', err);
    throw err;
  }
}
