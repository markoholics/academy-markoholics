// POST /api/verify-payment
// Verifies Razorpay signature server-side, then marks the enrollment as paid in Supabase.

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

  // ── Validate env vars immediately — missing vars cause silent hangs ──
  const { RAZORPAY_KEY_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!RAZORPAY_KEY_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[verify-payment] Missing env vars:', {
      hasSecret: !!RAZORPAY_KEY_SECRET,
      hasUrl:    !!SUPABASE_URL,
      hasKey:    !!SUPABASE_SERVICE_ROLE_KEY,
    });
    return res.status(500).json({ error: 'Server misconfiguration — contact support.' });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    enrollment_id,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !enrollment_id) {
    return res.status(400).json({ error: 'Missing required payment fields' });
  }

  // ── 1. Verify Razorpay signature ──
  const digest = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (digest !== razorpay_signature) {
    console.error('[verify-payment] Signature mismatch for enrollment', enrollment_id);
    return res.status(400).json({ error: 'Payment verification failed — signature mismatch.' });
  }

  // ── 2. Mark enrollment as paid (with 8s timeout so Vercel doesn't cut us off) ──
  // Create client inside handler so env vars are guaranteed to be loaded
  const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const updatePromise = sb
    .from('enrollments')
    .update({
      payment_status:      'paid',
      razorpay_order_id,
      razorpay_payment_id,
    })
    .eq('id', enrollment_id);

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Supabase update timed out')), 8000)
  );

  try {
    const { error } = await Promise.race([updatePromise, timeoutPromise]);
    if (error) {
      console.error('[verify-payment] Supabase update failed:', error.message);
      // Payment IS verified — return success so the user isn't blocked
      return res.status(200).json({
        success: true,
        payment_id: razorpay_payment_id,
        warning: 'DB update failed — will be reconciled.',
      });
    }
  } catch (err) {
    console.error('[verify-payment] Error during DB update:', err.message);
    // Still return success — Razorpay signature is verified
    return res.status(200).json({
      success: true,
      payment_id: razorpay_payment_id,
      warning: 'DB update timed out — will be reconciled.',
    });
  }

  return res.status(200).json({ success: true, payment_id: razorpay_payment_id });
};
