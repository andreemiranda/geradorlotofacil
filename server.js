const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve static files with proper MIME types & CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.path.endsWith('/manifest.json')) {
    res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  } else if (req.path.endsWith('/sw.js')) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  } else if (req.path.endsWith('.svg')) {
    res.setHeader('Content-Type', 'image/svg+xml');
  } else if (req.path.endsWith('.ico')) {
    res.setHeader('Content-Type', 'image/x-icon');
  } else if (req.path.endsWith('.png')) {
    res.setHeader('Content-Type', 'image/png');
  }
  next();
});

// Serve jsPDF library
app.get('/vendor/jspdf.umd.min.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'vendor/jspdf.umd.min.js'));
});

// Serve static files from root directory
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (filePath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    } else if (filePath.endsWith('.ico')) {
      res.setHeader('Content-Type', 'image/x-icon');
    } else if (filePath.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    }
  }
}));

// Fallback to index.html ONLY for navigation / page requests without file extensions
app.use((req, res) => {
  if (req.path.includes('.')) {
    return res.status(404).send('Not Found');
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Lotofácil Pro server running on http://${HOST}:${PORT}`);
});
