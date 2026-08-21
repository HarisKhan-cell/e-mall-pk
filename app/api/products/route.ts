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

const DEFAULT_CATALOG = [
  // --- OUTFITTERS (5) ---
  {
    id: 'outfitters-1',
    title: 'Super Cropped Embroidered Denim Shirt',
    description: 'Trendy embroidered cropped denim shirt.',
    price: 4190,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800'])
  },
  {
    id: 'outfitters-2',
    title: 'Gathered Blouse',
    description: 'Elegant gathered neckline blouse for daily wear.',
    price: 3790,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800'])
  },
  // --- KHAADI (5) ---
  {
    id: 'khaadi-1',
    title: 'Khaadi Floral V-Neck Kurta',
    description: 'Embroidered Cambric Cotton floral V-neck kurta.',
    price: 4490,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6bc045c4/images/hi-res/1-26-111-a-f_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-2',
    title: 'Khaadi Beige V-Neck Kurta',
    description: 'Embroidered Cotton Viscose kurta with subtle beige tones.',
    price: 4290,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf6e45b4b/images/hi-res/1-26-128-a-e_multi_1.jpg?sw=800'])
  },
  // --- BREAKOUT (5) ---
  {
    id: 'breakout-1',
    title: 'Breakout Printed Button Down Shirt',
    description: '100% Cotton printed button down shirt.',
    price: 2249,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/6DSWT912-MTO_6.jpg?v=1782899185&width=1920'])
  }
];

export async function GET() {
  try {
    const res = await fetch(`${SUPABASE_URL}?select=*&order=created_at.desc`, {
      headers,
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch (e) {
    console.error('Supabase GET Error:', e);
  }

  return NextResponse.json(DEFAULT_CATALOG);
}

export async function POST(req: Request) {
  try {
    const newProduct = await req.json();
    
    const res = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(newProduct)
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ success: true, data });
    }
  } catch (err) {
    console.error('Supabase POST Error:', err);
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      await fetch(`${SUPABASE_URL}?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers
      });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Supabase DELETE Error:', err);
  }
  return NextResponse.json({ success: true });
}