// POST /api/verify-payment
// Verifies Razorpay signature server-side, then marks the enrollment as paid in Supabase.

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// Service-role key bypasses RLS so we can UPDATE any row
const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    enrollment_id,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !enrollment_id) {
    return res.status(400).json({ error: 'Missing required payment fields' });
  }

  // ── 1. Verify signature ──
  // Razorpay signs: HMAC-SHA256(order_id + "|" + payment_id, key_secret)
  const digest = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (digest !== razorpay_signature) {
    console.error('[verify-payment] Signature mismatch for enrollment', enrollment_id);
    return res.status(400).json({ error: 'Payment verification failed — signature mismatch.' });
  }

  // ── 2. Mark enrollment as paid in Supabase ──
  const { error } = await sb
    .from('enrollments')
    .update({
      payment_status:      'paid',
      razorpay_order_id,
      razorpay_payment_id,
    })
    .eq('id', enrollment_id);

  if (error) {
    console.error('[verify-payment] Supabase update failed:', error);
    // Payment IS verified — don't tell user it failed, log it for manual fix
    return res.status(500).json({ error: 'Payment verified but DB update failed. Contact us.' });
  }

  return res.status(200).json({ success: true, payment_id: razorpay_payment_id });
};
