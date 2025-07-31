const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');


const app = express();
app.use(express.json());

const logsFile = 'logs.json';
const THRESHOLD = 80;
const PORT = 3000;


let statusLogs = [];


if (fs.existsSync(logsFile)) {
  try {
    const data = fs.readFileSync(logsFile, 'utf-8');
    statusLogs = JSON.parse(data);
  } catch (e) {
    console.error('Failed to load logs from file, using empty array.');
    statusLogs = [];
  }
}

const sendAlertEmail = (system, load) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "ekensy90@gmail.com",
      pass: "vbix funy yqsm qlkv",
    },
  });

  const mailOptions = {
    from: "ekensy90@gmail.com",
    to: "niveshs@amadisglobal.com",
    subject: `[ALERT] ${system} is down or overloaded!`,
    text: `Alert: ${system} has exceeded threshold or is down.\nCurrent Load: ${load}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error('Email Error:', err);
    else console.log('Alert Email Sent:', info.response);
  });
};

const checkThreshold = (req, res, next) => {
  const { system, status, load } = req.body;
  if (load >= THRESHOLD || status?.toLowerCase() === 'down') {
    sendAlertEmail(system, load);
  }
  next();
};

app.post('/status-report', checkThreshold, (req, res) => {
  console.log('Received status report:', req.body);
  
  const newLog = {
    timestamp: new Date().toISOString(),
    ...req.body,
  };

  statusLogs.push(newLog);

  try {
    fs.writeFileSync(logsFile, JSON.stringify(statusLogs, null, 2));
  } catch (err) {
    console.error('Error writing to logs.json:', err);
  }

  res.status(200).json({ message: 'Status received and logged.' });
});

app.get('/status-report', (req, res) => {
  res.json(statusLogs);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
