#!/usr/bin/env node

const https = require('https');

// Get the deployment URL from command line argument
const deploymentUrl = process.argv[2];

if (!deploymentUrl) {
  console.log('❌ Please provide the deployment URL as an argument');
  console.log('Example: node scripts/test-deployment.js https://your-app.vercel.app');
  process.exit(1);
}

const imagesToTest = [
  '/imagetrail/gemini.svg',
  '/imagetrail/cursor.svg',
  '/imagetrail/figma.svg',
  '/imagetrail/tailwind.svg',
  '/imagetrail/gsap.svg',
  '/imagetrail/claude.svg',
  '/imagetrail/next.svg',
  '/imagetrail/gpt.svg',
  '/noise.svg',
  '/favicon.svg',
];

console.log(`🔍 Testing deployment at: ${deploymentUrl}\n`);

async function testImage(url) {
  return new Promise((resolve) => {
    const fullUrl = `${deploymentUrl}${url}`;
    
    https.get(fullUrl, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ ${url} - ${res.statusCode} OK`);
        resolve({ success: true, url, status: res.statusCode });
      } else {
        console.log(`❌ ${url} - ${res.statusCode} ERROR`);
        resolve({ success: false, url, status: res.statusCode });
      }
    }).on('error', (err) => {
      console.log(`❌ ${url} - Network Error: ${err.message}`);
      resolve({ success: false, url, error: err.message });
    });
  });
}

async function runTests() {
  console.log('🧪 Testing image accessibility...\n');
  
  const results = await Promise.all(imagesToTest.map(testImage));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n📊 Results:`);
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ Failed images:');
    failed.forEach(f => console.log(`  - ${f.url}`));
  }
  
  if (successful.length === imagesToTest.length) {
    console.log('\n🎉 All images are accessible!');
  } else {
    console.log('\n⚠️ Some images are not accessible. Check your deployment configuration.');
  }
}

runTests().catch(console.error); 