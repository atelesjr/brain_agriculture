// Simple Vercel Serverless function to return producers from server/db.json
// This avoids the client receiving index.html when requesting /producers
// on a static Vercel deployment.
const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  try {
    const dbPath = path.join(__dirname, '..', 'server', 'db.json');
    const raw = fs.readFileSync(dbPath, 'utf8');
    const json = JSON.parse(raw);
    const producers = json.producers || [];
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(producers));
  } catch (err) {
    // In case reading fails, return an empty array with 200 so the UI
    // degrades gracefully.
    // eslint-disable-next-line no-console
    console.error('api/producers error', err);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify([]));
  }
};
