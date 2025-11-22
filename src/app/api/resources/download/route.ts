import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Resources download API' });
}

export async function POST(request: Request) {
  try {
    const { email, resourceType } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // TODO: In production, you would:
    // 1. Save the email to your database
    // 2. Send an email with the resource link using the email service
    // 3. Track the download for analytics

    console.log('Resource download requested:', {
      email,
      resourceType,
      timestamp: new Date().toISOString()
    });

    // For now, simulate successful response
    return NextResponse.json({ 
      success: true,
      message: 'Resource download initiated'
    });

  } catch (error) {
    console.error('Error processing resource download:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
