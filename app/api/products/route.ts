import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SUPABASE_URL = 'https://wuubgyclcmixhkgxefji.supabase.co/rest/v1/products';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dWJneWNsY21peGhrZ3hlZmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMDkzNDMsImV4cCI6MjEwMjg4NTM0M30.qoHuSD1bajU-Ad1UyvWbfP9ovkFTMxC8DUFIf9Xw6Jo';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

let memoryProducts: any[] = [];

export async function GET() {
  try {
    const res = await fetch(`${SUPABASE_URL}?select=*&order=created_at.desc`, {
      headers,
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        memoryProducts = data;
        return NextResponse.json(data);
      }
    }
  } catch (e) {
    console.error('Supabase GET Error:', e);
  }

  return NextResponse.json(memoryProducts);
}

export async function POST(req: Request) {
  try {
    const newProduct = await req.json();
    
    // Save to server memory immediately
    memoryProducts = [newProduct, ...memoryProducts.filter((p) => p.id !== newProduct.id)];

    // Send POST to Supabase Cloud
    await fetch(SUPABASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(newProduct)
    });

    return NextResponse.json({ success: true, products: memoryProducts });
  } catch (err) {
    console.error('Supabase POST Error:', err);
  }
  return NextResponse.json({ success: true, products: memoryProducts });
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      memoryProducts = memoryProducts.filter((p) => p.id !== id);

      await fetch(`${SUPABASE_URL}?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers
      });
    }
    return NextResponse.json({ success: true, products: memoryProducts });
  } catch (err) {
    console.error('Supabase DELETE Error:', err);
  }
  return NextResponse.json({ success: true, products: memoryProducts });
}