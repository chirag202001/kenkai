import { NextResponse } from 'next/server';
import { getBookedSlots, createBooking, isSlotAvailable } from '@/lib/supabase';

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

    const bookedSlots = await getBookedSlots(date);

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

    // Check if slot is already booked
    const slotAvailable = await isSlotAvailable(date, time);

    if (!slotAvailable) {
      return NextResponse.json(
        { error: 'This time slot is already booked. Please select another time.' },
        { status: 409 }
      );
    }

    // Create new booking in database
    const newBooking = await createBooking({
      date,
      time,
      name,
      email,
      company,
      service
    });

    // Log the booking
    console.log('New booking created:', newBooking);

    // Send confirmation emails (non-blocking)
    Promise.all([
      sendAdminNotification({ ...newBooking, challenge, role, timeline, budget }),
      sendClientConfirmation({ ...newBooking, challenge, role, timeline, budget })
    ]).catch(err => {
      console.error('Failed to send confirmation emails:', err);
    });

    return NextResponse.json({ 
      success: true, 
      booking: newBooking 
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Send notification to admin
async function sendAdminNotification(data: any) {
  try {
    const nodemailer = await import('nodemailer');
    
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_EMAIL_TO || 'hello@kenkailabs.com';
    const from = process.env.CONTACT_EMAIL_FROM || user || 'noreply@kenkailabs.com';

    if (!host || !user || !pass) {
      console.log('Admin notification logged (SMTP not configured):', data);
      return;
    }

    const transporter = nodemailer.default.createTransport({
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
      subject: `🔔 New Booking: ${data.service} - ${data.company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Booking Received</h2>
          
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
        </div>
      `,
      replyTo: data.email
    });

    console.log('Admin notification email sent');
  } catch (err) {
    console.error('Failed to send admin email (non-fatal):', err);
  }
}

// Send confirmation to client
async function sendClientConfirmation(data: any) {
  try {
    const nodemailer = await import('nodemailer');
    
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.CONTACT_EMAIL_FROM || user || 'noreply@kenkailabs.com';

    if (!host || !user || !pass) {
      console.log('Client confirmation logged (SMTP not configured):', data.email);
      return;
    }

    const transporter = nodemailer.default.createTransport({
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
      to: data.email,
      subject: `✅ Booking Confirmed - ${data.service} at Kenkai Labs`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Booking Confirmed! 🎉</h1>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #374151;">Hi ${data.name},</p>
            
            <p style="font-size: 16px; color: #374151;">
              Thank you for booking with <strong>Kenkai Labs</strong>! We're excited to connect with you.
            </p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <h3 style="color: #2563eb; margin-top: 0;">📅 Your Appointment Details</h3>
              <p style="margin: 10px 0;"><strong>Service:</strong> ${data.service}</p>
              <p style="margin: 10px 0;"><strong>Date:</strong> ${formattedDate}</p>
              <p style="margin: 10px 0;"><strong>Time:</strong> ${data.time} IST</p>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">📞 What's Next?</h3>
              <ul style="color: #374151; line-height: 1.8;">
                <li>You'll receive a calendar invite shortly</li>
                <li>Our team will reach out 24 hours before the meeting</li>
                <li>Please prepare any questions or materials you'd like to discuss</li>
              </ul>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;">
                <strong>Need to reschedule?</strong> Reply to this email or call us at <a href="tel:+919537267679" style="color: #2563eb;">+91-9537267679</a>
              </p>
            </div>
            
            <p style="font-size: 16px; color: #374151; margin-top: 30px;">
              Looking forward to working with you!
            </p>
            
            <p style="font-size: 16px; color: #374151;">
              Best regards,<br>
              <strong>The Kenkai Labs Team</strong>
            </p>
            
            <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #6b7280; text-align: center;">
              Kenkai Labs | Problem Discovery • Roadmap Strategy • Software Execution<br>
              <a href="https://kenkai.vercel.app" style="color: #2563eb;">kenkai.vercel.app</a> | 
              <a href="tel:+919537267679" style="color: #2563eb;">+91-9537267679</a>
            </p>
            
            <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 20px;">
              Booking ID: ${data.id}
            </p>
          </div>
        </div>
      `,
      replyTo: from
    });

    console.log('Client confirmation email sent to:', data.email);
  } catch (err) {
    console.error('Failed to send client email (non-fatal):', err);
  }
}
