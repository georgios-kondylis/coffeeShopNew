// routes/order.js
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { email, name, cartItems, total } = req.body;

  if (!email || !cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const itemList = cartItems.map(item =>
    `<li>${item.product.title} x${item.quantity} : ${item.product.price} SEK ${item.quantity > 1 ? 'each' : ''}</li>`
  ).join("");  

  const message = `
    <h2>Hi ${name || "Customer"},</h2>
    <p>Thank you for your order! Here's a summary:</p>
    <ul>${itemList}</ul>
    <p><strong>Total:</strong> ${total} SEK</p>
    <p>We'll start processing your order shortly. ❤️</p>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Upendi Coffe Shop by GK" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Order Confirmation",
      html: message
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Email sending failed." });
  }
});

export default router;
