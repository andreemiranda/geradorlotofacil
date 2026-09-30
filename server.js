const express = require('express');
const path = require('path');
const fs = require('fs');
const embedded = require('./embedded-assets');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Global CORS & preflight
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Explicit routes for core favicon and icon assets with guaranteed in-memory fallback
app.get(['/favicon-32x32.png', '/images/favicon-32x32.png', '/favicon.png', '/images/favicon.png'], (req, res) => {
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  const candidates = [
    path.join(__dirname, 'images', 'favicon-32x32.png'),
    path.join(process.cwd(), 'images', 'favicon-32x32.png'),
    path.join(__dirname, 'favicon-32x32.png'),
    path.join(process.cwd(), 'favicon-32x32.png')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return res.sendFile(c);
  }
  return res.send(Buffer.from(embedded.fav32Base64, 'base64'));
});

app.get(['/favicon-16x16.png', '/images/favicon-16x16.png'], (req, res) => {
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  const candidates = [
    path.join(__dirname, 'images', 'favicon-16x16.png'),
    path.join(process.cwd(), 'images', 'favicon-16x16.png'),
    path.join(__dirname, 'favicon-16x16.png'),
    path.join(process.cwd(), 'favicon-16x16.png')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return res.sendFile(c);
  }
  return res.send(Buffer.from(embedded.fav16Base64, 'base64'));
});

app.get(['/favicon.ico', '/images/favicon.ico'], (req, res) => {
  res.setHeader('Content-Type', 'image/x-icon');
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  const candidates = [
    path.join(__dirname, 'images', 'favicon.ico'),
    path.join(process.cwd(), 'images', 'favicon.ico'),
    path.join(__dirname, 'favicon.ico'),
    path.join(process.cwd(), 'favicon.ico')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return res.sendFile(c);
  }
  return res.send(Buffer.from(embedded.icoBase64, 'base64'));
});

app.get(['/icon.svg', '/images/icon.svg', '/favicon.svg', '/images/favicon.svg'], (req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  const candidates = [
    path.join(__dirname, 'images', 'icon.svg'),
    path.join(process.cwd(), 'images', 'icon.svg'),
    path.join(__dirname, 'icon.svg'),
    path.join(process.cwd(), 'icon.svg')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return res.sendFile(c);
  }
  return res.send(embedded.iconSvg);
});

app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  const file = fs.existsSync(path.join(__dirname, 'manifest.json'))
    ? path.join(__dirname, 'manifest.json')
    : path.join(process.cwd(), 'manifest.json');
  return res.sendFile(file);
});

app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  const file = fs.existsSync(path.join(__dirname, 'sw.js'))
    ? path.join(__dirname, 'sw.js')
    : path.join(process.cwd(), 'sw.js');
  return res.sendFile(file);
});

app.get('/vendor/jspdf.umd.min.js', (req, res) => {
  const file = fs.existsSync(path.join(__dirname, 'vendor/jspdf.umd.min.js'))
    ? path.join(__dirname, 'vendor/jspdf.umd.min.js')
    : path.join(process.cwd(), 'vendor/jspdf.umd.min.js');
  return res.sendFile(file);
});

// Dynamic multi-root static file resolution for any other asset in /images or root
const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();

  let reqPath = decodeURIComponent(req.path).replace(/^\/+/, '');
  if (!reqPath) return next();

  const ext = path.extname(reqPath).toLowerCase();
  if (!ext) return next();

  const filename = path.basename(reqPath);
  const candidates = [
    path.join(__dirname, reqPath),
    path.join(process.cwd(), reqPath),
    path.join(__dirname, 'images', filename),
    path.join(process.cwd(), 'images', filename),
    path.join(__dirname, filename),
    path.join(process.cwd(), filename)
  ];

  for (const c of candidates) {
    try {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) {
        const mime = MIME_TYPES[ext] || 'application/octet-stream';
        res.setHeader('Content-Type', mime);
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        return res.sendFile(c);
      }
    } catch (e) {}
  }

  next();
});

// Fallback to index.html for navigation / SPA routes
app.use((req, res) => {
  if (req.path.includes('.')) {
    return res.status(404).send('Not Found');
  }
  const indexFile = fs.existsSync(path.join(__dirname, 'index.html'))
    ? path.join(__dirname, 'index.html')
    : path.join(process.cwd(), 'index.html');
  res.sendFile(indexFile);
});

app.listen(PORT, HOST, () => {
  console.log(`Lotofácil Pro server running on http://${HOST}:${PORT}`);
});
