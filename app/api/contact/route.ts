import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate name (no numbers allowed)
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(name)) {
      return NextResponse.json(
        { error: 'Name should only contain letters' },
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

    // Validate phone number (numbers, spaces, +, -, () allowed)
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Check if credentials are available
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Configure email options - Send TO business email
    const mailOptions = {
      from: `"Fondasi Website" <${process.env.GMAIL_USER}>`,
      to: 'fondasicreative@gmail.com', // Business email
      subject: `New Contact Form Submission from ${name}`,
      html: generateEmailHTML(body),
      replyTo: email, // User's email for easy reply
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        messageId: info.messageId,
        message: 'Email sent successfully'
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Email sending error:', error);

    return NextResponse.json(
      {
        error: 'Failed to send email. Please try again later.',
      },
      { status: 500 }
    );
  }
}

function generateEmailHTML(data: ContactFormData): string {
  const { name, email, phone, service, message } = data;

  const serviceLabels: Record<string, string> = {
    website: 'Website Development',
    mobile: 'Mobile Development',
    media: 'Media Production',
    design: 'Design Branding',
    social: 'Social Media Management',
    other: 'Other'
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 48px 40px; text-align: center;">
              <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 36px; font-weight: 700; color: #ffffff; letter-spacing: 3px;">
                FONDASI
              </h1>
              <p style="margin: 12px 0 0 0; font-size: 13px; color: #999999; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;">
                Creative Agency
              </p>
            </td>
          </tr>

          <!-- Title Section -->
          <tr>
            <td style="padding: 40px 40px 24px 40px;">
              <h2 style="margin: 0; font-size: 26px; font-weight: 600; color: #000000; line-height: 1.3;">
                New Contact Form Submission
              </h2>
              <p style="margin: 12px 0 0 0; font-size: 14px; color: #666666; line-height: 1.5;">
                ${currentDate}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 2px; background: linear-gradient(90deg, #000000 0%, #e5e5e5 100%);"></div>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding: 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                
                <!-- Name -->
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      Full Name
                    </p>
                    <p style="margin: 0; font-size: 17px; color: #000000; font-weight: 600; line-height: 1.4;">
                      ${name}
                    </p>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      Email Address
                    </p>
                    <p style="margin: 0; font-size: 17px; line-height: 1.4;">
                      <a href="mailto:${email}" style="color: #000000; text-decoration: none; font-weight: 500; border-bottom: 2px solid #000000; padding-bottom: 2px;">
                        ${email}
                      </a>
                    </p>
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      Phone Number
                    </p>
                    <p style="margin: 0; font-size: 17px; line-height: 1.4;">
                      <a href="tel:${phone}" style="color: #000000; text-decoration: none; font-weight: 500;">
                        ${phone}
                      </a>
                    </p>
                  </td>
                </tr>

                <!-- Service -->
                <tr>
                  <td style="padding-bottom: 0;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      Service of Interest
                    </p>
                    <p style="margin: 0; font-size: 17px; color: #000000; font-weight: 600; line-height: 1.4;">
                      ${serviceLabels[service] || service}
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background-color: #e5e5e5;"></div>
            </td>
          </tr>

          <!-- Message Section -->
          <tr>
            <td style="padding: 32px 40px;">
              <p style="margin: 0 0 16px 0; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                Message
              </p>
              <div style="background-color: #fafafa; border-left: 4px solid #000000; padding: 24px; border-radius: 6px;">
                <p style="margin: 0; font-size: 16px; color: #333333; line-height: 1.7; white-space: pre-wrap; font-weight: 400;">
${message}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 32px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666; line-height: 1.5;">
                This email was sent from the contact form on
              </p>
              <p style="margin: 0; font-size: 15px; color: #000000; font-weight: 700; letter-spacing: 0.5px;">
                fondasicreative.com
              </p>
              <p style="margin: 16px 0 0 0; font-size: 12px; color: #999999;">
                Reply directly to this email to respond to ${name}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
