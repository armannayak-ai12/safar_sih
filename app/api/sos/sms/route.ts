import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendSms } from "@/lib/sms";

export async function POST(request: Request) {
  try {
    // 1. Verify the logged-in SAFAR user
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Read the SMS details
    const body = await request.json();

    const { to, message } = body;

    if (!to || typeof to !== "string") {
      return NextResponse.json(
        { error: "Recipient phone number is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // 3. Send SMS through Twilio
    const result = await sendSms(to, message);

    // 4. Return success
    return NextResponse.json({
      success: true,
      messageSid: result.sid,
    });
  } catch (error) {
    console.error("SMS sending failed:", error);

    return NextResponse.json(
      { error: "Failed to send SMS." },
      { status: 500 }
    );
  }
}