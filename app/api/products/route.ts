import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    {
      id: 'khaadi-1',
      title: 'Khaadi Floral V-Neck Kurta',
      description: 'Embroidered Cambric Cotton floral V-neck kurta (2-26-203-A-G1).',
      price: 4490,
      stock: 12,
      category: { name: 'Fashion & Apparel' },
      shop: { name: 'Khaadi Official', commissionRate: 5.0 },
      images: JSON.stringify([
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6bc045c4/images/hi-res/1-26-111-a-f_multi_1.jpg?sw=800'
      ])
    },
    {
      id: 'khaadi-2',
      title: 'Khaadi Beige V-Neck Kurta',
      description: 'Embroidered Cotton Viscose kurta with subtle beige tones (1-26-118-A-F).',
      price: 4290,
      stock: 10,
      category: { name: 'Fashion & Apparel' },
      shop: { name: 'Khaadi Official', commissionRate: 5.0 },
      images: JSON.stringify([
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf6e45b4b/images/hi-res/1-26-128-a-e_multi_1.jpg?sw=800',
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw168e98e2/images/hi-res/1-26-128-a-e_multi_2.jpg?sw=800'
      ])
    },
    {
      id: 'khaadi-3',
      title: 'Khaadi Dyed Raw Silk Kurta',
      description: '100% Cotton Raw Silk finish dyed kurta (8-26-301-A-D1).',
      price: 4000,
      stock: 20,
      category: { name: 'Fashion & Apparel' },
      shop: { name: 'Khaadi Official', commissionRate: 5.0 },
      images: JSON.stringify([
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/8-26-301-a-d1_multi_1.jpg?sw=800'
      ])
    },
    {
      id: 'khaadi-4',
      title: 'Khaadi Raw Silk Black Co-Ord 3-Piece Set',
      description: 'Luxury Raw Silk kurta, pants, and sequin embroidered dupatta (5-26-201-F-H).',
      price: 25000,
      stock: 5,
      category: { name: 'Fashion & Apparel' },
      shop: { name: 'Khaadi Official', commissionRate: 5.0 },
      images: JSON.stringify([
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw15321f8a/images/hi-res/5-26-201-f-h_multi_1.jpg?sw=800',
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw542129ba/images/hi-res/5-26-201-f-h_multi_2.jpg?sw=800'
      ])
    },
    {
      id: 'khaadi-5',
      title: 'Khaadi Floral Tailored Set',
      description: 'Tailored Cotton Satin / Viscose 2-Piece Set (T-A33-26-202FC1).',
      price: 6990,
      stock: 8,
      category: { name: 'Fashion & Apparel' },
      shop: { name: 'Khaadi Official', commissionRate: 5.0 },
      images: JSON.stringify([
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw83741829/images/hi-res/t-a33-26-202fc1_multi_1.jpg?sw=800'
      ])
    },
    {
      id: 'khaadi-6',
      title: 'Khaadi Embroidered Raw Silk Kurta',
      description: 'Raw silk off-white V-neck embroidered thread work kurta (2-26-209-A-I1).',
      price: 4500,
      stock: 12,
      category: { name: 'Fashion & Apparel' },
      shop: { name: 'Khaadi Official', commissionRate: 5.0 },
      images: JSON.stringify([
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/2-26-209-a-i1_multi_1.jpg?sw=800'
      ])
    },
    {
      id: 'khaadi-7',
      title: 'Khaadi Printed Lawn 3-Piece Fabrics Suit',
      description: '3-Piece unstitched printed lawn shirt, dupatta & trouser (A22-26-202FH1-E).',
      price: 5490,
      stock: 15,
      category: { name: 'Fashion & Apparel' },
      shop: { name: 'Khaadi Official', commissionRate: 5.0 },
      images: JSON.stringify([
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/a22-26-202fh1-e_multi_1.jpg?sw=800'
      ])
    },
    {
      id: 'khaadi-8',
      title: 'Khaadi Embroidered Textured Lawn 2-Piece',
      description: 'Digital printed textured lawn shirt (3m) & cambric trouser (2.5m) (A112-26-120ED1).',
      price: 3150,
      stock: 18,
      category: { name: 'Fashion & Apparel' },
      shop: { name: 'Khaadi Official', commissionRate: 5.0 },
      images: JSON.stringify([
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/a112-26-120ed1_multi_1.jpg?sw=800'
      ])
    },
    {
      id: 'khaadi-9',
      title: 'Khaadi Puff Paste Printed Cambric 2-Piece',
      description: 'Puff paste printed cambric shirt (3m) & dyed trouser (2.5m) (A112-26-112EC1).',
      price: 2800,
      stock: 22,
      category: { name: 'Fashion & Apparel' },
      shop: { name: 'Khaadi Official', commissionRate: 5.0 },
      images: JSON.stringify([
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/a112-26-112ec1_multi_1.jpg?sw=800'
      ])
    },
    {
      id: 'khaadi-10',
      title: 'Khaadi Printed Lawn 3-Piece Suit (Classic)',
      description: 'Printed lawn shirt (3m), dupatta (2.5m) & cambric trouser (2.5m) (A22-26-202FH1).',
      price: 5490,
      stock: 14,
      category: { name: 'Fashion & Apparel' },
      shop: { name: 'Khaadi Official', commissionRate: 5.0 },
      images: JSON.stringify([
        'https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/a22-26-202fh1_multi_1.jpg?sw=800'
      ])
    }
  ];

  return NextResponse.json(products);
}