const express = require('express');
const fetch = require('node-fetch');
const app = express();

// 👇 Apna Events Calendar feed URL yahan daalo
const WP_ICAL_URL = 'https://gracebk.org/?post_type=tribe_events&ical=1';

app.get('/proxy.ics', async (req, res) => {
  try {
    const resp = await fetch(WP_ICAL_URL);
    if (!resp.ok) {
      res.status(500).send('Error fetching feed');
      return;
    }
    const body = await resp.text();

    res.set('Content-Type', 'text/calendar; charset=utf-8');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(body);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
