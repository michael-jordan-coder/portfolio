#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// List of images to verify
const imagesToVerify = [
  '/imagetrail/gemini.svg',
  '/imagetrail/cursor.svg',
  '/imagetrail/figma.svg',
  '/imagetrail/tailwind.svg',
  '/imagetrail/gsap.svg',
  '/imagetrail/claude.svg',
  '/imagetrail/next.svg',
  '/imagetrail/gpt.svg',
];

// Check if files exist locally
function checkLocalFiles() {
  console.log('🔍 Checking local image files...');
  
  const publicDir = path.join(__dirname, '..', 'public');
  
  imagesToVerify.forEach(imagePath => {
    const localPath = path.join(publicDir, imagePath.replace('/', ''));
    const exists = fs.existsSync(localPath);
    
    if (exists) {
      const stats = fs.statSync(localPath);
      console.log(`✅ ${imagePath} - ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      console.log(`❌ ${imagePath} - NOT FOUND`);
    }
  });
}

// Test image loading from a deployed URL
function testImageLoading(baseUrl = 'https://your-vercel-domain.vercel.app') {
  console.log(`\n🌐 Testing image loading from ${baseUrl}...`);
  
  const promises = imagesToVerify.map(imagePath => {
    return new Promise((resolve) => {
      const url = `${baseUrl}${imagePath}`;
      const protocol = url.startsWith('https:') ? https : http;
      
      const req = protocol.get(url, (res) => {
        if (res.statusCode === 200) {
          console.log(`✅ ${imagePath} - ${res.statusCode} OK`);
          resolve({ success: true, path: imagePath, status: res.statusCode });
        } else {
          console.log(`❌ ${imagePath} - ${res.statusCode} ERROR`);
          resolve({ success: false, path: imagePath, status: res.statusCode });
        }
      });
      
      req.on('error', (err) => {
        console.log(`❌ ${imagePath} - Network Error: ${err.message}`);
        resolve({ success: false, path: imagePath, error: err.message });
      });
      
      req.setTimeout(5000, () => {
        console.log(`⏰ ${imagePath} - Timeout`);
        req.destroy();
        resolve({ success: false, path: imagePath, error: 'Timeout' });
      });
    });
  });
  
  return Promise.all(promises);
}

// Main execution
async function main() {
  console.log('🚀 Image Verification Script\n');
  
  // Check local files
  checkLocalFiles();
  
  // If a URL is provided as argument, test remote loading
  const baseUrl = process.argv[2];
  if (baseUrl) {
    const results = await testImageLoading(baseUrl);
    const failed = results.filter(r => !r.success);
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Successful: ${results.filter(r => r.success).length}`);
    console.log(`❌ Failed: ${failed.length}`);
    
    if (failed.length > 0) {
      console.log('\nFailed images:');
      failed.forEach(f => console.log(`  - ${f.path}`));
    }
  } else {
    console.log('\n💡 To test remote loading, run:');
    console.log('   node scripts/verify-images.js https://your-domain.vercel.app');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkLocalFiles, testImageLoading }; 