import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log the contact submission
    console.log('Contact form submission:', {
      name,
      email,
      company,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Send email notification (non-blocking if SMTP not configured)
    try {
      await sendContactEmail({ name, email, company, subject, message });
    } catch (emailError) {
      console.error('Email sending failed (non-fatal):', emailError);
      // Continue - don't fail the request if email fails
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Contact form submitted successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}

async function sendContactEmail(data: {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_EMAIL_TO || 'hello@kenkailabs.com';
  const from = process.env.CONTACT_EMAIL_FROM || user || 'noreply@kenkailabs.com';

  if (!host || !user || !pass) {
    console.log('Contact form email logged (SMTP not configured):', data);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from,
      to,
      subject: `Contact Form: ${data.subject}`,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Subject: ${data.subject}

Message:
${data.message}

---
Submitted: ${new Date().toISOString()}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">Submitted: ${new Date().toLocaleString()}</p>
        </div>
      `,
      replyTo: data.email
    });

    console.log('Contact form email sent successfully');
  } catch (err) {
    console.error('Failed to send contact form email:', err);
    throw err;
  }
}