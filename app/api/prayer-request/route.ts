import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const GOOGLE_SCRIPT_URL =
      process.env.GOOGLE_SCRIPT_URL || process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_SCRIPT_URL is not configured");

      return NextResponse.json(
        {
          success: false,
          error: "Google Apps Script URL is not configured."
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        fullName: body.fullName,
        ageGroup: body.ageGroup,
        gender: body.gender,

        country: body.country,
        state: body.state,
        district: body.district,
        city: body.city,

        prayerCategory: body.prayerCategory,
        prayerRequestTitle: body.prayerRequestTitle,
        prayerRequest: body.prayerRequest,

        email: body.email,
        phone: body.phone
      })
    });

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            result.message ||
            "Google Sheets submission failed."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Prayer request submitted successfully."
    });

  } catch (error) {
    console.error("Prayer request error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to submit your prayer request right now."
      },
      { status: 500 }
    );
  }
}