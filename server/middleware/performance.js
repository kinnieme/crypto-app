const compression = require('compression');
const express = require('express');

// Compression middleware to reduce response size
const compress = compression({
  level: 6, // Compression level (1-9, where 9 is highest compression)
  threshold: 1024, // Only compress responses larger than 1KB
});

// Cache middleware for static assets
const cacheStaticAssets = (req, res, next) => {
  // Cache static assets for 1 hour
  if (req.url.startsWith('/static/') || req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/)) {
    res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
  }
  next();
};

// Response time tracking middleware
const trackResponseTime = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
    
    // Log slow requests
    if (duration > 1000) {
      console.warn(`Slow request: ${req.method} ${req.url} took ${duration}ms`);
    }
  });
  
  next();
};

// Improved static file serving
const serveStaticFiles = express.static('client/build', {
  maxAge: '1h', // Cache for 1 hour
  etag: true, // Enable ETag generation
 lastModified: true, // Set Last-Modified header
 setHeaders: (res, path) => {
    // Set cache headers for different file types
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (path.endsWith('.js') || path.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year for JS/CSS
    }
  }
});

module.exports = {
  compress,
  cacheStaticAssets,
  trackResponseTime,
  serveStaticFiles
};