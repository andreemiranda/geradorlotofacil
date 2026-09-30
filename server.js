const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve static files with proper MIME types
app.use((req, res, next) => {
  if (req.path.endsWith('/manifest.json')) {
    res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
  } else if (req.path.endsWith('/sw.js')) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-cache');
  } else if (req.path.endsWith('.svg')) {
    res.setHeader('Content-Type', 'image/svg+xml');
  }
  next();
});

// Serve jsPDF library
app.get('/vendor/jspdf.umd.min.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'vendor/jspdf.umd.min.js'));
});

// Serve static files from root directory
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for direct route requests
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Lotofácil Pro server running on http://${HOST}:${PORT}`);
});
