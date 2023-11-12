const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001; // You can change the port if needed

// Middleware for parsing JSON requests
app.use(bodyParser.json());

app.use(cors());

app.get('/', async (req, res) => {
  res.send('Server working');
})

// Endpoint for sending emails
app.post('/send-email', async (req, res) => {
  const { user, owner } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  const userMailOptions = {
    from: user.from,
    to: user.to,
    subject: user.subject,
    text: user.text,
  };

  const ownerMailOptions = {
    from: owner.from,
    to: owner.to,
    subject: owner.subject,
    text: owner.text,
  };

  try {
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(ownerMailOptions);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending emails' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
