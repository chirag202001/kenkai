import { NextResponse } from "next/server";
import { persistTalentInterest, sendTalentInterestEmail } from "@/lib/email";

interface TalentInterestBody {
  email?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body: TalentInterestBody = await request.json();
    const email = body.email?.trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    // Persist locally (development) and attempt notification
    await persistTalentInterest(email);
    await sendTalentInterestEmail(email);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Talent interest POST error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
