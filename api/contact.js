const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const { name, email, message } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return res.status(400).json({ error: "One or more fields are too long." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const user = process.env.GMAIL_USER;
    const appPassword = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.CONTACT_TO || user;

    if (!user || !appPassword) {
      console.error("Missing email environment variables.");
      return res.status(500).json({ error: "Contact service is not configured yet." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass: appPassword },
    });

    await transporter.sendMail({
      from: `"Aneeq Tahir Portfolio" <${user}>`,
      to: recipient,
      replyTo: email.trim(),
      subject: `Portfolio Inquiry from ${name.trim()}`,
      text:
        `Name: ${name.trim()}\n` +
        `Email: ${email.trim()}\n\n` +
        `Message:\n${message.trim()}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "Unable to send your message right now. Please try again later.",
    });
  }
};
