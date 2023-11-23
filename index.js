const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');

const app = express();

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
      user: config.AUTH_EMAIL,
      pass: config.AUTH_PASS,
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
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
