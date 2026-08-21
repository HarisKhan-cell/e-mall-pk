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

const BASE_PRODUCTS = [
  // --- OUTFITTERS (10) ---
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
  {
    id: 'outfitters-3',
    title: 'Textured Blouse',
    description: 'Soft lightweight textured casual top.',
    price: 2190,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800'])
  },
  {
    id: 'outfitters-4',
    title: 'All-Over Print Shirt',
    description: 'Vibrant modern digital print casual shirt.',
    price: 2790,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800'])
  },
  {
    id: 'outfitters-5',
    title: 'Striped T-Shirt',
    description: 'Classic striped crew neck cotton tee.',
    price: 1690,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800'])
  },
  {
    id: 'outfitters-6',
    title: 'Graphic T-Shirt (Urban)',
    description: 'Streetwear graphic chest print cotton tee.',
    price: 1390,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800'])
  },
  {
    id: 'outfitters-7',
    title: 'Graphic T-Shirt (Pro Edition)',
    description: 'Heavyweight cotton graphic tee.',
    price: 3090,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800'])
  },
  {
    id: 'outfitters-8',
    title: 'All Over Print Casual Shirt',
    description: 'Relaxed fit printed button down shirt.',
    price: 3090,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800'])
  },
  {
    id: 'outfitters-9',
    title: 'Striped Resort Shirt',
    description: 'Breathable vacation style striped shirt.',
    price: 3090,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800'])
  },
  {
    id: 'outfitters-10',
    title: 'Knitted Striped Shirt',
    description: 'Premium soft knit striped casual shirt.',
    price: 3790,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800'])
  },

  // --- KHAADI OFFICIAL (10) ---
  {
    id: 'khaadi-1',
    title: 'Khaadi Floral V-Neck Kurta',
    description: 'Embroidered Cambric Cotton floral V-neck kurta (2-26-203-A-G1).',
    price: 4490,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6bc045c4/images/hi-res/1-26-111-a-f_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-2',
    title: 'Khaadi Beige V-Neck Kurta',
    description: 'Embroidered Cotton Viscose kurta with subtle beige tones (1-26-118-A-F).',
    price: 4290,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf6e45b4b/images/hi-res/1-26-128-a-e_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-3',
    title: 'Khaadi Dyed Raw Silk Kurta',
    description: '100% Cotton Raw Silk finish dyed kurta (8-26-301-A-D1).',
    price: 4000,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/8-26-301-a-d1_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-4',
    title: 'Khaadi Raw Silk Black Co-Ord 3-Piece Set',
    description: 'Luxury Raw Silk kurta, pants, and sequin embroidered dupatta (5-26-201-F-H).',
    price: 25000,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw15321f8a/images/hi-res/5-26-201-f-h_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-5',
    title: 'Khaadi Floral Tailored Set',
    description: 'Tailored Cotton Satin / Viscose 2-Piece Set (T-A33-26-202FC1).',
    price: 6990,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw83741829/images/hi-res/t-a33-26-202fc1_multi_1.jpg?sw=800'])
  },

  // --- BREAKOUT OFFICIAL (11) ---
  {
    id: 'breakout-1',
    title: 'Breakout Printed Button Down Shirt',
    description: '100% Cotton printed button down shirt with modern classic silhouette (6DSWT912-MTO).',
    price: 2249,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/6DSWT912-MTO_6.jpg?v=1782899185&width=1920'])
  },
  {
    id: 'breakout-2',
    title: 'Breakout Boys Striped Tee',
    description: '100% Cotton knit everyday boys striped tee (K6DST673-MLT).',
    price: 699,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6DST673-MLT_1.jpg?v=1779280870&width=1920'])
  },
  {
    id: 'breakout-3',
    title: "Breakout Men's Textured Tee (Brown)",
    description: '50% Cotton, 45% Polyester, 5% Spandex textured finish tee (6ESHT844-BRN).',
    price: 3899,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/6ESHT844-BRN_1.jpg?v=1782899185&width=1920'])
  },
  {
    id: 'breakout-4',
    title: 'Breakout Boys Contrast Rib Tee (Ecru)',
    description: '100% Cotton knit sporty contrast rib tee for boys (K6DST639-ECR).',
    price: 699,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6DST639-ECR_1.jpg?v=1778504092&width=1920'])
  },
  {
    id: 'breakout-5',
    title: 'Breakout Boys Smurf Perfume (50ml / Blue)',
    description: 'Refreshing, long-lasting 50ml fragrance for boys (K6ASBF03-BLU).',
    price: 1849,
    category: { name: 'Perfumes & Accessories' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6ASBF03-BLU_2_dba2b513-f441-47a0-9e44-5f4e277dd32e.jpg?v=1777985061&width=1920'])
  },
  {
    id: 'breakout-6',
    title: 'Breakout Boys Hero Perfume (50ml / Black)',
    description: 'Refreshing signature 50ml fragrance for boys (K6ASBF01-BLK).',
    price: 1849,
    category: { name: 'Perfumes & Accessories' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6ASBF01-BLK_1.jpg?v=1777985061&width=1920'])
  }
];

export async function GET() {
  try {
    const res = await fetch(`${SUPABASE_URL}?select=*&order=created_at.desc`, { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch (e) {
    console.error('Supabase GET Error:', e);
  }

  return NextResponse.json(BASE_PRODUCTS);
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
      return NextResponse.json({ success: true });
    }
  } catch (err) {
    console.error('Supabase POST Error:', err);
  }
  return NextResponse.json({ error: 'Failed to add product to Supabase' }, { status: 500 });
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const res = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        return NextResponse.json({ success: true });
      }
    }
  } catch (err) {
    console.error('Supabase DELETE Error:', err);
  }
  return NextResponse.json({ error: 'Failed to delete product from Supabase' }, { status: 500 });
}
