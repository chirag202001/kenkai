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

    console.log('Login attempt with hash:', hashedPassword);

    // Compare with environment variable
    const correctHash = process.env.ADMIN_PASSWORD_HASH;

    // Development fallback passwords
    const devPasswords = {
      'admin123': '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
      'chirag123': 'e6d12f1658709a376cf3a2d74488fba55c4104984d03be886573d4cd122c7844'
    };

    // Check environment variable first
    if (correctHash && hashedPassword === correctHash) {
      return NextResponse.json({ success: true });
    }

    // Fallback to development passwords if env var not set
    if (!correctHash) {
      console.warn('⚠️ ADMIN_PASSWORD_HASH not set - using development fallback');
      if (Object.values(devPasswords).includes(hashedPassword)) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json(
        { error: 'Invalid password. Try: admin123 or chirag123' },
        { status: 401 }
      );
    }

    // Password doesn't match
    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Admin verification error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
