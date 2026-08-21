import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SUPABASE_URL = 'https://wuubgyclcmixhkgxefji.supabase.co/rest/v1/vendors';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dWJneWNsY21peGhrZ3hlZmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMDkzNDMsImV4cCI6MjEwMjg4NTM0M30.qoHuSD1bajU-Ad1UyvWbfP9ovkFTMxC8DUFIf9Xw6Jo';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

export async function GET() {
  try {
    const res = await fetch(`${SUPABASE_URL}?select=*&order=created_at.desc`, { headers });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (e) {
    console.error('Supabase Vendors GET Error:', e);
  }
  return NextResponse.json([]);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const vendorData = {
      vendor_name: body.vendorName,
      vendor_phone: body.vendorPhone,
      vendor_insta: body.vendorInsta,
      vendor_city: body.vendorCity,
      date: body.date
    };

    const res = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(vendorData)
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    }
  } catch (err) {
    console.error('Supabase Vendors POST Error:', err);
  }
  return NextResponse.json({ error: 'Failed to save vendor application' }, { status: 500 });
}