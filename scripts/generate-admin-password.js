const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== Admin Password Hash Generator ===\n');
console.log('This script generates a secure hash for your admin password.');
console.log('The hash should be added to Vercel environment variables.\n');

rl.question('Enter your desired admin password: ', (password) => {
  if (!password || password.length < 8) {
    console.error('\n❌ Password must be at least 8 characters long');
    rl.close();
    process.exit(1);
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex');

  console.log('\n✅ Password hash generated successfully!\n');
  console.log('================================================');
  console.log('Add this to Vercel Environment Variables:');
  console.log('================================================\n');
  console.log('Variable Name:  ADMIN_PASSWORD_HASH');
  console.log('Variable Value: ' + hash);
  console.log('\n================================================\n');
  console.log('Steps:');
  console.log('1. Go to Vercel Dashboard → Your Project → Settings');
  console.log('2. Click "Environment Variables"');
  console.log('3. Add new variable:');
  console.log('   Name: ADMIN_PASSWORD_HASH');
  console.log('   Value: (paste the hash above)');
  console.log('   Environment: Production, Preview, Development');
  console.log('4. Save and redeploy your application');
  console.log('\n⚠️  IMPORTANT: Keep your password secure and never commit it to git!\n');

  rl.close();
});
