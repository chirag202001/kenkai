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
      // Temporary fallback for development (password: admin123)
      // REMOVE THIS IN PRODUCTION - Add ADMIN_PASSWORD_HASH to Vercel env vars
      const devHash = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';
      if (hashedPassword === devHash) {
        console.warn('⚠️ Using development fallback password - configure ADMIN_PASSWORD_HASH in production!');
        return NextResponse.json({ success: true });
      }
      return NextResponse.json(
        { error: 'Admin authentication not configured. Please add ADMIN_PASSWORD_HASH environment variable.' },
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
