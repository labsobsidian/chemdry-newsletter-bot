export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ghlToken = process.env.GHL_TOKEN;
  if (!ghlToken) {
    return res.status(500).json({ error: 'GHL token not configured' });
  }

  try {
    const response = await fetch('https://services.leadconnectorhq.com/emails/builder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ghlToken,
        'Version': '2021-07-28',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
