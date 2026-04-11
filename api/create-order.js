// POST /api/create-order
// Creates a Razorpay order server-side — the Key Secret never touches the browser.

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = async (req, res) => {
  // CORS — allow your two subdomains (and localhost for testing)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

  const { amount_inr, tier_label, enrollment_id } = req.body;

  if (!amount_inr || !enrollment_id) {
    return res.status(400).json({ error: 'Missing amount_inr or enrollment_id' });
  }

  try {
    const order = await razorpay.orders.create({
      amount:   Math.round(amount_inr * 100), // paise
      currency: 'INR',
      receipt:  `enrol_${enrollment_id}`.slice(0, 40), // max 40 chars
      notes:    { enrollment_id, tier: tier_label },
    });

    return res.status(200).json({
      order_id: order.id,
      key_id:   process.env.RAZORPAY_KEY_ID,   // safe to expose
      amount:   order.amount,                    // paise
      currency: order.currency,
    });
  } catch (err) {
    console.error('[create-order]', err);
    return res.status(500).json({ error: 'Could not create Razorpay order. Try again.' });
  }
};
