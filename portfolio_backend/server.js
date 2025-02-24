import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(express.json()); // Replace bodyParser with built-in middleware
app.use(express.urlencoded({ extended: true }));

// ****************************************Mail code here**********************************

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nautiyalsandeep19@gmail.com', // Replace with your email
    pass: 'jfxp fglr sqwp nyqy', // Replace with your app-specific password
  },
});

// API endpoint to handle form submission
app.post('/api/send-mail', async (req, res) => {
  const { fullname, email, message } = req.body;

  // Validate inputs early
  if (!fullname || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email to Admin
  const adminMailOptions = {
    from: 'nautiyalsandeep19@gmail.com', // Replace with your email
    to: 'underratedbard14@gmail.com', // Replace with admin's email
    subject: 'New Form Submission',
    html: `
      <h3>Sandeep, ${fullname} Wants To Contact You.</h3>
      <p><strong>Name:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  // Email to User
  const userMailOptions = {
    from: 'nautiyalsandeep19@gmail.com',
    to: email,
    subject: `Thank You ${fullname} for submitting your details!`,
    html: `
      <p>I have received your details and I'll get back to you shortly.</p>
      <p>Your Submitted Details:</p>
      <ul>
        <li><strong>Name:</strong> ${fullname}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
      <p>Thank you for reaching out!</p>
    `,
  };

  try {
    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});


import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests, please try again later.',
});
app.use('/api/', limiter); 


const server = app.listen(2000, () => {
  console.log('Server running on http://localhost:2000');
});
server.keepAliveTimeout = 61 * 1000;
server.headersTimeout = 65 * 1000;
