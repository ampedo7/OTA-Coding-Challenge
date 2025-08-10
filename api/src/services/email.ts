import nodemailer from 'nodemailer';
import { generateJwtToken } from './utils';
import { JobData } from '../types/job';

function cleanCdata(htmlWithCdata: string): string {
  // Remove <![CDATA[ ... ]]> wrappers
  return htmlWithCdata
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .trim();
}

export function generateHtmlTemplate(jobId: string, JobData: JobData) {
  const spamToken = generateJwtToken({ jobId: jobId, status: 'spam' });
  const approveToken = generateJwtToken({
    jobId: jobId,
    status: 'approved'
  });
  const baseUrl = process.env.BASE_URL + '/api/jobs/verify';
  const approveLink = `${baseUrl}?verificationKey=${encodeURIComponent(
    approveToken
  )}`;
  const declineLink = `${baseUrl}?verificationKey=${encodeURIComponent(
    spamToken
  )}`;

  const jobDescriptionsHtml = JobData.jobDescriptions
    .map(
      (desc) => `
      <div class="job-description">
        <h3>desc.name</h3>
        <h3>${cleanCdata(desc.value)}</h3>
      </div>
    `
    )
    .join('\n');

  // return { approveLink, declineLink, JobData };
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Job Approval</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            background: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          h1 {
            color: #222;
          }
          .job-description {
            margin-top: 20px;
            padding: 15px;
            background-color: #f1f1f1;
            border-radius: 4px;
          }
          .buttons {
            margin-top: 30px;
            display: flex;
            gap: 15px;
          }
          a.button {
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 5px;
            color: #fff;
            font-weight: bold;
            display: inline-block;
          }
          a.approve {
            background-color: #28a745; /* green */
          }
          a.decline {
            background-color: #dc3545; /* red */
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Job Approval Request</h1>
          <p><strong>Job Name:</strong> ${JobData.name}</p>
          ${jobDescriptionsHtml}
          <div class="buttons">
            <a href="${approveLink}" class="button approve">Approve</a>
            <a href="${declineLink}" class="button decline">Decline</a>
          </div>
        </div>
      </body>
      </html>
    `;
}

export async function sendEmail(to: string, subject: string, html: string) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true if 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Email options
  const mailOptions = {
    from: `"HR System" <keano4502@yopmail.com>`,
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
