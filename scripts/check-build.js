#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files that should be included in the build
const requiredFiles = [
  'public/imagetrail/gemini.svg',
  'public/imagetrail/cursor.svg',
  'public/imagetrail/figma.svg',
  'public/imagetrail/tailwind.svg',
  'public/imagetrail/gsap.svg',
  'public/imagetrail/claude.svg',
  'public/imagetrail/next.svg',
  'public/imagetrail/gpt.svg',
  'public/noise.svg',
  'public/favicon.svg',
  'public/dashboard-os/dashboard-os.png',
];

console.log('🔍 Checking build files...\n');

let allFilesExist = true;

requiredFiles.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const stats = fs.statSync(fullPath);
    console.log(`✅ ${filePath} - ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log(`❌ ${filePath} - MISSING`);
    allFilesExist = false;
  }
});

console.log('\n📊 Summary:');
if (allFilesExist) {
  console.log('✅ All required files are present');
} else {
  console.log('❌ Some files are missing - check the build process');
}

// Check if .next directory exists (build output)
const nextDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(nextDir)) {
  console.log('✅ .next build directory exists');
} else {
  console.log('⚠️ .next build directory not found - run "npm run build" first');
}

console.log('\n💡 To build and test:');
console.log('   npm run build');
console.log('   npm run start'); 