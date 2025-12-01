# Security Setup for Admin Dashboard

## Overview
The `/bookings` admin page contains sensitive client data (PII - Personally Identifiable Information) and must be protected to comply with data protection laws (GDPR, CCPA, etc.).

## ⚠️ Legal Compliance
Client booking data includes:
- Full names
- Email addresses
- Company information
- Phone numbers (if collected)
- Business challenges and requirements

This data must be:
- ✅ Protected from unauthorized access
- ✅ Accessible only to authorized team members
- ✅ Encrypted in transit (HTTPS)
- ✅ Stored securely (Supabase with RLS)
- ✅ Access-logged for audit trails

## Password Protection Implementation

### Step 1: Generate Admin Password Hash

Run this command to create a secure password hash:

```bash
node scripts/generate-admin-password.js
```

**Example output:**
```
Enter your desired admin password: YourSecurePassword123!

✅ Password hash generated successfully!

================================================
Add this to Vercel Environment Variables:
================================================

Variable Name:  ADMIN_PASSWORD_HASH
Variable Value: a1b2c3d4e5f6...

================================================
```

### Step 2: Add to Vercel Environment Variables

1. Go to https://vercel.com
2. Open your kenkai project
3. Click **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `ADMIN_PASSWORD_HASH`
   - **Value**: (paste the hash from Step 1)
   - **Environment**: Check all three: Production, Preview, Development
5. Click **Save**

### Step 3: Add to Local Development (.env.local)

Update your local `.env.local` file:

```env
ADMIN_PASSWORD_HASH=your_generated_hash_here
```

### Step 4: Redeploy

After adding the environment variable:
```bash
git add .
git commit -m "Add admin authentication for bookings page"
git push origin main
```

Or redeploy from Vercel dashboard.

## How It Works

### Authentication Flow
1. User visits `/bookings`
2. System checks for session authentication
3. If not authenticated, shows password login form
4. User enters password
5. Password is hashed using SHA-256
6. Hash is compared with `ADMIN_PASSWORD_HASH` environment variable
7. If match: Access granted, session stored
8. If no match: Error shown, access denied

### Security Features
- ✅ **SHA-256 Hashing**: Password never sent in plain text
- ✅ **Session Storage**: Authentication persists during browser session
- ✅ **Environment Variables**: Password hash not in code
- ✅ **Server-Side Verification**: API route validates password
- ✅ **HTTPS**: All traffic encrypted in production
- ✅ **No Password Storage**: Only hash stored, original password unknown

## Password Best Practices

### Creating Strong Passwords
- ✅ Minimum 12 characters
- ✅ Mix of uppercase, lowercase, numbers, symbols
- ✅ Avoid dictionary words
- ✅ Don't reuse passwords from other services
- ✅ Use a password manager

**Good examples:**
- `Kenkai@2025$SecureAdmin`
- `BookingDash#Mumbai2025!`
- `K3nk@i-Adm1n-P@ssw0rd`

**Bad examples:**
- `password123` ❌
- `admin` ❌
- `kenkai2025` ❌

## Sharing Access with Team

### Option 1: Single Shared Password
- Generate one password hash
- Share password securely with team (e.g., 1Password, LastPass)
- All team members use same password

### Option 2: Multiple Passwords (Future Enhancement)
For better audit trails, you can extend the system to support:
- Individual admin accounts
- Role-based access (view-only, edit, delete)
- Login activity logs
- Password reset functionality

## Testing Authentication

### Test Locally
1. Visit `http://localhost:3000/bookings`
2. Should see login screen with password field
3. Enter your password
4. Should see bookings dashboard if correct
5. Close browser and reopen - should need to login again

### Test in Production
1. Visit `https://kenkai.vercel.app/bookings`
2. Verify password protection is active
3. Test with correct password - should grant access
4. Test with wrong password - should show error
5. Share URL with someone without password - they should be blocked

## Additional Security Measures

### Recommended Enhancements

1. **IP Whitelisting** (Vercel Pro)
   - Restrict admin pages to company IP addresses only
   - Configure in Vercel firewall settings

2. **Two-Factor Authentication (2FA)**
   - Add email OTP verification
   - Use Supabase Auth for 2FA

3. **Session Timeouts**
   - Auto-logout after 30 minutes of inactivity
   - Require re-authentication

4. **Audit Logs**
   - Log all admin access attempts
   - Track who viewed which bookings
   - Store in Supabase audit table

5. **Rate Limiting**
   - Prevent brute force attacks
   - Max 5 failed login attempts per 15 minutes

## Data Protection Compliance

### GDPR Compliance Checklist
- ✅ Client data encrypted in transit (HTTPS)
- ✅ Client data encrypted at rest (Supabase)
- ✅ Access restricted to authorized personnel only
- ✅ Data can be deleted on request (Supabase delete)
- ⚠️ Consider adding: Privacy policy, data retention policy
- ⚠️ Consider adding: Consent tracking, data export functionality

### CCPA Compliance Checklist
- ✅ Data access restricted
- ✅ Data can be deleted
- ⚠️ Consider adding: "Do Not Sell" mechanism (if applicable)
- ⚠️ Consider adding: Data access request portal

## Emergency Access

### Lost Password Recovery
If you lose the admin password:

1. Generate new hash locally:
   ```bash
   node scripts/generate-admin-password.js
   ```

2. Update Vercel environment variable with new hash

3. Redeploy or wait for cold start (~5 minutes)

### Lockout Scenario
If environment variable is missing or incorrect:
- API will return 500 error
- Check Vercel logs: Dashboard → Deployments → Functions tab
- Verify `ADMIN_PASSWORD_HASH` exists in environment variables

## Security Monitoring

### What to Monitor
1. **Failed Login Attempts**
   - Check Vercel logs for 401 errors on `/api/admin/verify`
   - Investigate multiple failures from same IP

2. **Unusual Access Patterns**
   - Access from unexpected locations
   - Access at unusual times
   - High volume of requests

3. **Data Export/Download**
   - Monitor if anyone uses browser dev tools to download data
   - Consider adding download logging

### Incident Response
If unauthorized access suspected:
1. Immediately change admin password
2. Review Vercel logs for access patterns
3. Check Supabase audit logs
4. Notify affected clients if data breach occurred
5. Document incident for compliance

## Support

### Common Issues

**Q: Login not working even with correct password**
A: Check that `ADMIN_PASSWORD_HASH` environment variable is set in Vercel and matches your generated hash

**Q: How to allow multiple team members?**
A: Share the same password securely, or implement multi-user authentication system

**Q: Password protection bypassed?**
A: Ensure you redeployed after adding environment variable. Check browser console for errors.

**Q: Need to rotate password regularly?**
A: Run password generator script quarterly and update Vercel env var

## Contact for Security Issues

For security vulnerabilities or concerns:
- Email: security@kenkailabs.com (update this)
- Do not post security issues publicly on GitHub
- Report data breaches immediately to legal team
