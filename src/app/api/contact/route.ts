import { NextResponse } from 'next/server';

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

    // Log the contact submission (in production, this would send email/save to DB)
    console.log('Contact form submission:', {
      name,
      email,
      company,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Implement email sending or database storage
    // Example: await sendEmail({ to: 'hello@kenkailabs.com', subject, body: message });
    // Example: await saveToDatabase({ name, email, company, subject, message });

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