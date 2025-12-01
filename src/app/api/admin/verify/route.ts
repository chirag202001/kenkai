import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Admin password verification
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Hash the provided password
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    // Compare with environment variable
    const correctHash = process.env.ADMIN_PASSWORD_HASH;

    if (!correctHash) {
      console.error('ADMIN_PASSWORD_HASH environment variable is not set');
      return NextResponse.json(
        { error: 'Admin authentication not configured' },
        { status: 500 }
      );
    }

    if (hashedPassword === correctHash) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin verification error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
