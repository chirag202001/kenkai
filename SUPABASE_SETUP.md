# Supabase Integration Setup Guide

## Overview
This guide walks you through setting up Supabase as the permanent database for the Kenkai booking system.

## Prerequisites
- Supabase account (free tier is sufficient)
- Access to Vercel project environment variables

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization (or create one)
4. Fill in project details:
   - **Name**: kenkai-bookings (or your preferred name)
   - **Database Password**: Generate a strong password (save it securely)
   - **Region**: Choose closest to your users (e.g., Mumbai for India)
5. Click "Create new project" and wait ~2 minutes for setup

## Step 2: Create Database Table

1. In your Supabase project dashboard, click "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy the entire contents of `supabase-setup.sql` file
4. Paste it into the SQL editor
5. Click "Run" to execute the SQL
6. You should see "Success. No rows returned" message

## Step 3: Get Supabase Credentials

1. In Supabase dashboard, click "Project Settings" (gear icon) in the left sidebar
2. Click "API" in the settings menu
3. You'll need two values:
   - **Project URL**: Copy the URL under "Project URL" (looks like `https://xxxxxxxxxxxxx.supabase.co`)
   - **Anon Key**: Copy the key under "Project API keys" → "anon" → "public"

## Step 4: Add Environment Variables to Vercel

1. Go to [https://vercel.com](https://vercel.com) and open your kenkai project
2. Click "Settings" tab
3. Click "Environment Variables" in the left menu
4. Add these two variables:

**Variable 1:**
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Your Supabase Project URL (from Step 3)
- **Environment**: Production, Preview, Development (check all)

**Variable 2:**
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase Anon Key (from Step 3)
- **Environment**: Production, Preview, Development (check all)

5. Click "Save" for each variable

## Step 5: Deploy to Vercel

The code changes are already committed. Now just push to GitHub to trigger deployment:

```bash
git push origin main
```

Or redeploy from Vercel dashboard:
1. Go to "Deployments" tab
2. Click the three dots on latest deployment
3. Click "Redeploy"

## Step 6: Test the Integration

1. Visit your booking page: `https://kenkai.vercel.app/book-call`
2. Select a service, fill in details, choose a date and time
3. Submit the booking
4. Verify success:
   - Check Supabase dashboard → Table Editor → bookings table
   - Check admin page: `https://kenkai.vercel.app/bookings`
   - Try booking the same slot again (should show error)

## Troubleshooting

### Error: "Failed to create booking"
**Check:**
- Environment variables are set in Vercel
- Vercel deployment completed after adding env vars
- Supabase table was created successfully
- Check Vercel logs: Dashboard → Deployments → Click deployment → "Functions" tab

### Error: "This time slot is already booked" (when it shouldn't be)
**Check:**
- Supabase Table Editor to see actual bookings
- Refresh the page before booking
- Clear browser cache

### No bookings showing in admin page
**Check:**
- Create a test booking first
- Check browser console for errors (F12)
- Verify Supabase has data in Table Editor

## Verification Checklist

- [ ] Supabase project created
- [ ] SQL table created successfully
- [ ] Both environment variables added to Vercel
- [ ] Redeployed after adding env vars
- [ ] Test booking created successfully
- [ ] Booking appears in Supabase Table Editor
- [ ] Booking appears in /bookings admin page
- [ ] Double-booking prevention works
- [ ] Email notifications working (if SMTP configured)

## Database Management

### View all bookings
1. Supabase Dashboard → Table Editor
2. Select "bookings" table
3. See all records with full details

### Manual booking deletion
1. Supabase Dashboard → Table Editor → bookings
2. Click the trash icon next to the booking
3. Confirm deletion

### Export bookings data
1. Supabase Dashboard → Table Editor → bookings
2. Click "Export to CSV" button

## Security Notes

- The `anon` key is safe to use in frontend code (it's meant to be public)
- Row Level Security (RLS) is enabled on the table
- Current policy allows all operations - you can restrict this later
- For admin-only operations, consider adding authentication

## Cost Considerations

**Supabase Free Tier includes:**
- 500 MB database space
- 2 GB file storage
- 50,000 monthly active users
- Unlimited API requests

This is more than sufficient for a booking system. You'll only need to upgrade if you have thousands of bookings or very high traffic.

## Next Steps (Optional)

1. **Add Admin Authentication**
   - Protect `/bookings` page with password
   - Use Supabase Auth or simple env var check

2. **Add Email to Client**
   - Send confirmation email to the client after booking
   - Include calendar invite (ICS file)

3. **Add Booking Cancellation**
   - Allow clients to cancel via unique link
   - Update database and send notification

4. **Analytics Dashboard**
   - Track booking trends
   - Most popular services
   - Conversion rates
