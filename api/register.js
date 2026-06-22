const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL  = 'https://xlfblvgtsqykyrnduyvn.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZmJsdmd0c3F5a3lybmR1eXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDY3MTgsImV4cCI6MjA5MDEyMjcxOH0.GfxMZ0tmMG1LL_A141ATBhmMVQdPl4EJvCmh7g-21mo';
const RESEND_KEY    = 're_J7dsQiBD_7NcZYSnDWz18vqyfyUMyBnDw';
const ZOOM_LINK     = 'https://us05web.zoom.us/j/87572164783?pwd=flHB3D3m07WDHavMuobOzV4pfnsq9g.1';
const FROM_EMAIL    = 'Human to the Power of AI <contact@humantothepowerofai.com>';

function buildEmail(full_name) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're registered!</title>
</head>
<body style="margin:0;padding:0;background:#0C0C12;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0C0C12;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#13131F;border:1px solid rgba(255,255,255,0.07);">

          <!-- Header -->
          <tr>
            <td style="padding:28px 40px;border-bottom:1px solid rgba(255,255,255,0.07);">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6E6E88;">HUMAN TO THE POWER OF AI · ACADEMY</p>
            </td>
          </tr>

          <!-- Confirmation badge -->
          <tr>
            <td style="padding:32px 40px 0;">
              <span style="display:inline-block;background:rgba(34,197,94,0.15);color:#22C55E;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 14px;border:1px solid rgba(34,197,94,0.3);">Registration Confirmed ✓</span>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:20px 40px 0;">
              <h1 style="margin:0;font-size:22px;font-weight:800;line-height:1.35;color:#ffffff;">How to Adapt to Google's Agentic AI Search: A Brand Playbook</h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:16px 40px 0;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#C8C8D8;">Hi <strong style="color:#ffffff;">${full_name}</strong>, you're confirmed for the free live webinar. Save your Zoom link below — you'll need it on the day.</p>
            </td>
          </tr>

          <!-- Event details box -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(75,107,251,0.08);border:1px solid rgba(75,107,251,0.25);">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="20" valign="top" style="padding:5px 12px 5px 0;font-size:15px;">📅</td>
                        <td style="padding:5px 0;">
                          <p style="margin:0;font-size:12px;color:#6E6E88;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Date &amp; Time</p>
                          <p style="margin:3px 0 0;font-size:15px;color:#ffffff;font-weight:700;">Thursday, 10 July 2026</p>
                          <p style="margin:2px 0 0;font-size:14px;color:#C8C8D8;">7:00 PM – 8:30 PM IST &nbsp;·&nbsp; 1:30 PM – 3:00 PM UTC</p>
                        </td>
                      </tr>
                      <tr>
                        <td width="20" valign="top" style="padding:12px 12px 5px 0;font-size:15px;">💻</td>
                        <td style="padding:12px 0 5px;">
                          <p style="margin:0;font-size:12px;color:#6E6E88;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Platform</p>
                          <p style="margin:3px 0 0;font-size:15px;color:#ffffff;font-weight:700;">Zoom (online, free)</p>
                        </td>
                      </tr>
                      <tr>
                        <td width="20" valign="top" style="padding:12px 12px 5px 0;font-size:15px;">🎤</td>
                        <td style="padding:12px 0 5px;">
                          <p style="margin:0;font-size:12px;color:#6E6E88;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Host</p>
                          <p style="margin:3px 0 0;font-size:15px;color:#ffffff;font-weight:700;">Mohammad H. Rahman</p>
                          <p style="margin:2px 0 0;font-size:14px;color:#C8C8D8;">Founder, Human to the Power of AI</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Zoom CTA -->
          <tr>
            <td style="padding:28px 40px 0;">
              <p style="margin:0 0 6px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6E6E88;">Your Zoom Join Link</p>
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#4B6BFB;">
                    <a href="${ZOOM_LINK}" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.01em;">Join Webinar on Zoom →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:10px 0 0;font-size:12px;color:#6E6E88;">Can't click? Copy this link:<br><a href="${ZOOM_LINK}" style="color:#4B6BFB;word-break:break-all;">${ZOOM_LINK}</a></p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid rgba(255,255,255,0.07);"></td></tr>
              </table>
            </td>
          </tr>

          <!-- What we'll cover -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 14px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6E6E88;">What We'll Cover</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:5px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="20" valign="top" style="color:#4B6BFB;font-weight:700;font-size:14px;padding-right:8px;">→</td>
                        <td style="font-size:14px;color:#C8C8D8;line-height:1.5;">How Google's Agentic AI Search fundamentally changes brand visibility</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:5px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="20" valign="top" style="color:#4B6BFB;font-weight:700;font-size:14px;padding-right:8px;">→</td>
                        <td style="font-size:14px;color:#C8C8D8;line-height:1.5;">How to get your brand cited by AI instead of buried beneath it</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:5px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="20" valign="top" style="color:#4B6BFB;font-weight:700;font-size:14px;padding-right:8px;">→</td>
                        <td style="font-size:14px;color:#C8C8D8;line-height:1.5;">The Brand Playbook: entity authority, content signals &amp; schema markup</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:5px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="20" valign="top" style="color:#4B6BFB;font-weight:700;font-size:14px;padding-right:8px;">→</td>
                        <td style="font-size:14px;color:#C8C8D8;line-height:1.5;">What the agentic commerce shift means for SEO and paid search budgets</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:5px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="20" valign="top" style="color:#4B6BFB;font-weight:700;font-size:14px;padding-right:8px;">→</td>
                        <td style="font-size:14px;color:#C8C8D8;line-height:1.5;">Live Q&amp;A — bring your real questions</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reminder tip -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(232,148,14,0.08);border:1px solid rgba(232,148,14,0.25);">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:13px;color:#E8940E;font-weight:700;">💡 Tip: Add this to your calendar so you don't miss it.</p>
                    <p style="margin:6px 0 0;font-size:13px;color:#C8C8D8;">The session starts at <strong style="color:#ffffff;">7:00 PM IST sharp</strong>. Zoom opens 5 minutes early.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px 36px;border-top:1px solid rgba(255,255,255,0.07);margin-top:28px;">
              <p style="margin:0;font-size:13px;line-height:1.7;color:#6E6E88;">
                Hosted by <span style="color:#C8C8D8;font-weight:700;">Mohammad H. Rahman</span> · Human to the Power of AI<br>
                Questions? Reply to this email or write to <a href="mailto:contact@humantothepowerofai.com" style="color:#4B6BFB;text-decoration:none;">contact@humantothepowerofai.com</a>
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#3A3A55;">
                You received this because you registered at academy.humantothepowerofai.com/event
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

  const { full_name, email, contact_number, company, company_url, designation } = req.body;

  if (!full_name || !email || !contact_number || !company || !designation) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
  const { error: dbError } = await sb
    .from('AI_search_registrations')
    .insert([{
      full_name,
      email: email.toLowerCase().trim(),
      contact_number,
      company,
      company_url: company_url || null,
      designation,
    }]);

  if (dbError) {
    console.error('[register] Supabase error:', dbError);
    return res.status(500).json({ error: 'Registration failed. Please try again.' });
  }

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to:   [email],
        subject: "You're registered! Zoom link inside — Google's Agentic AI Search Webinar · 10 July",
        html: buildEmail(full_name),
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error('[register] Resend error:', errText);
    }
  } catch (emailErr) {
    console.error('[register] Email send exception:', emailErr);
  }

  return res.status(200).json({ success: true });
};
