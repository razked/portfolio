import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const DESTINATION_EMAIL = process.env.CONTACT_EMAIL;

    if (!DESTINATION_EMAIL) {
      console.error("CONTACT_EMAIL environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Here you would implement your email sending logic
    // For now, we'll log it and return success
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      message,
      destination: DESTINATION_EMAIL,
      timestamp: new Date().toISOString(),
    });

    // Example: Using a service like Resend, SendGrid, or Nodemailer
    // await sendEmail({
    //   to: DESTINATION_EMAIL,
    //   from: email,
    //   subject: `New contact from ${name}`,
    //   text: message,
    // });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
