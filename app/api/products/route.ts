import { NextResponse } from 'next/server';

let globalProducts: any[] = [
  // Khaadi (10)
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
  {
    id: 'khaadi-6',
    title: 'Khaadi Embroidered Raw Silk Kurta',
    description: 'Raw silk off-white V-neck embroidered thread work kurta (2-26-209-A-I1).',
    price: 4500,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/2-26-209-a-i1_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-7',
    title: 'Khaadi Printed Lawn 3-Piece Fabrics Suit',
    description: '3-Piece unstitched printed lawn shirt, dupatta & trouser (A22-26-202FH1-E).',
    price: 5490,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/a22-26-202fh1-e_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-8',
    title: 'Khaadi Embroidered Textured Lawn 2-Piece',
    description: 'Digital printed textured lawn shirt (3m) & cambric trouser (2.5m) (A112-26-120ED1).',
    price: 3150,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/a112-26-120ed1_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-9',
    title: 'Khaadi Puff Paste Printed Cambric 2-Piece',
    description: 'Puff paste printed cambric shirt (3m) & dyed trouser (2.5m) (A112-26-112EC1).',
    price: 2800,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/a112-26-112ec1_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-10',
    title: 'Khaadi Printed Lawn 3-Piece Suit (Classic)',
    description: 'Printed lawn shirt (3m), dupatta (2.5m) & cambric trouser (2.5m) (A22-26-202FH1).',
    price: 5490,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/a22-26-202fh1_multi_1.jpg?sw=800'])
  },

  // Breakout (11)
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
    title: "Breakout Men's Baggy Fit Denim Jeans (Blue)",
    description: '100% Cotton Denim contemporary baggy fit jeans (6ESMD839-BLU).',
    price: 4999,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/6ESMD839-BLU_1.jpg?v=1782899185&width=1920'])
  },
  {
    id: 'breakout-6',
    title: 'Breakout Boys Graphic Tee (Black)',
    description: '100% Cotton knit crew neck graphic tee for boys (K6EST820-BLK).',
    price: 1699,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6EST820-BLK_1.jpg?v=1782899185&width=1920'])
  },
  {
    id: 'breakout-7',
    title: 'Breakout Boys Textured Polo Shirt (Burgundy)',
    description: '50% Cotton, 50% Polyester breathable textured polo shirt (K6ESP826-BRG).',
    price: 2099,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6ESP826-BRG_1.jpg?v=1786362306'])
  },
  {
    id: 'breakout-8',
    title: 'Breakout Boys Textured Striped Shirt (Navy & White)',
    description: '100% Polyester smart casual textured striped shirt (K6ESW806-NNW).',
    price: 2199,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6ESW806-NNW_1.jpg?v=1782899185&width=1920'])
  },
  {
    id: 'breakout-9',
    title: 'Breakout Boys Color Block Tee (Multi)',
    description: '100% Cotton knit vibrant multi-colored panel tee (K6EST692-MLT).',
    price: 1099,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6EST692-MLT_1.jpg?v=1782899185&width=1920'])
  },
  {
    id: 'breakout-10',
    title: 'Breakout Boys Smurf Perfume (50ml / Blue)',
    description: 'Refreshing, long-lasting 50ml fragrance for boys (K6ASBF03-BLU).',
    price: 1849,
    category: { name: 'Perfumes & Accessories' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6ASBF03-BLU_2_dba2b513-f441-47a0-9e44-5f4e277dd32e.jpg?v=1777985061&width=1920'])
  },
  {
    id: 'breakout-11',
    title: 'Breakout Boys Hero Perfume (50ml / Black)',
    description: 'Refreshing signature 50ml fragrance for boys (K6ASBF01-BLK).',
    price: 1849,
    category: { name: 'Perfumes & Accessories' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6ASBF01-BLK_1.jpg?v=1777985061&width=1920'])
  }
];

export async function GET() {
  return NextResponse.json(globalProducts);
}

export async function POST(req: Request) {
  try {
    const newProduct = await req.json();
    globalProducts = [newProduct, ...globalProducts];
    return NextResponse.json({ success: true, products: globalProducts });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
      globalProducts = globalProducts.filter((p) => p.id !== id);
    }
    return NextResponse.json({ success: true, products: globalProducts });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
