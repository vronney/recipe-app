// Quick script to check if environment variables are loaded
console.log('\n=== Firebase Environment Variables ===\n');

const vars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

vars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✓ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`✗ ${varName}: NOT SET`);
  }
});

console.log('\n=== Instructions ===');
console.log('If any variables show "NOT SET":');
console.log('1. Verify .env.local file exists in project root');
console.log('2. Check variable names match exactly (including NEXT_PUBLIC_ prefix)');
console.log('3. Restart your dev server completely');
console.log('4. Clear Next.js cache: rm -rf .next\n');
