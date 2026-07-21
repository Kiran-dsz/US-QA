#!/usr/bin/env node

/**
 * Team Hub Test Runner - Executable Skill for Claude
 * Usage: node run-tests.js [--headed] [--debug] [--grep PATTERN]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let headed = args.includes('--headed');
let debug = args.includes('--debug');
let grepPattern = null;

// Parse grep pattern
const grepIndex = args.indexOf('--grep');
if (grepIndex !== -1 && args[grepIndex + 1]) {
  grepPattern = args[grepIndex + 1];
}

console.log('🎯 Team Hub MVP - Test Execution');
console.log('================================\n');

try {
  // Check if node_modules exists
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Dependencies installed\n');
  }

  // Build playwright command
  let command = 'npx playwright test tests/phase-1-regression.spec.js --workers=1';

  if (headed) {
    command += ' --headed';
  }
  if (debug) {
    command += ' --debug';
  }
  if (grepPattern) {
    command += ` --grep "${grepPattern}"`;
  }

  console.log(`🚀 Running: ${command}\n`);

  // Execute tests
  try {
    execSync(command, {
      stdio: 'inherit',
      cwd: __dirname
    });
    console.log('\n✅ Tests completed successfully!');
  } catch (error) {
    console.log('\n⚠️ Some tests failed or were skipped');
  }

  // Show report location
  console.log('\n📊 Test Report:');
  console.log('   HTML: playwright-report/index.html');
  console.log('   Videos: test-results/');
  console.log('\n💡 View full report:');
  console.log('   npx playwright show-report');

} catch (error) {
  console.error('❌ Error running tests:', error.message);
  process.exit(1);
}
