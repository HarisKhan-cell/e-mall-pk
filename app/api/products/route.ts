import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const INITIAL_PRODUCTS = [
  // SANA SAFINAZ
  {
    id: 'p-sana-1',
    title: 'Sana Safinaz Stitched Embroidered Raw Silk Shirt + Culotte',
    description: 'Luxury stitched embroidered raw silk shirt with matching culotte trousers.',
    price: 15999,
    stock: 12,
    images: '["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600"]',
    shop: { id: 'shop-sana', name: 'Sana Safinaz Official' },
    category: { name: 'Fashion & Apparel' },
  },
  {
    id: 'p-sana-2',
    title: 'Sana Safinaz Stitched Printed Crepe Shirt + Dupatta',
    description: 'Stitched premium printed crepe shirt paired with digital printed chiffon dupatta.',
    price: 8399,
    stock: 15,
    images: '["https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=600"]',
    shop: { id: 'shop-sana', name: 'Sana Safinaz Official' },
    category: { name: 'Fashion & Apparel' },
  },
  {
    id: 'p-sana-3',
    title: 'Sana Safinaz Unstitched Muzlin Lawn 3-Piece Suit',
    description: 'Unstitched 3-piece muzlin lawn embroidered shirt with printed dupatta and trousers.',
    price: 6990,
    stock: 20,
    images: '["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600"]',
    shop: { id: 'shop-sana', name: 'Sana Safinaz Official' },
    category: { name: 'Fashion & Apparel' },
  },

  // SAPPHIRE
  {
    id: 'p-sapphire-1',
    title: 'Sapphire 2-Piece Printed Lawn Suit - Intermix 26',
    description: 'Authentic 2-piece printed lawn shirt with dyed trousers collection.',
    price: 3290,
    stock: 25,
    images: '["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600"]',
    shop: { id: 'shop-sapphire', name: 'Sapphire Official' },
    category: { name: 'Fashion & Apparel' },
  },
  {
    id: 'p-sapphire-2',
    title: 'Sapphire 3-Piece Embroidered Lawn Suit',
    description: 'Luxury unstitched 3-piece embroidered lawn shirt with printed chiffon dupatta.',
    price: 6590,
    stock: 18,
    images: '["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600"]',
    shop: { id: 'shop-sapphire', name: 'Sapphire Official' },
    category: { name: 'Fashion & Apparel' },
  },

  // J. JUNAID JAMSHED FRAGRANCES
  {
    id: 'p-j-1',
    title: 'J. All-Rounder | Shoaib Malik Eau De Parfum',
    description: 'Signature luxury fresh woody and spicy long-lasting fragrance created for men.',
    price: 7700,
    stock: 30,
    images: '["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600"]',
    shop: { id: 'shop-j', name: 'J. Official' },
    category: { name: 'Fashion & Apparel' },
  },
  {
    id: 'p-j-2',
    title: 'J. 25 Elixir Pour Homme Perfume',
    description: 'Exclusive 25th anniversary luxury amber oriental perfume for men.',
    price: 6600,
    stock: 20,
    images: '["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600"]',
    shop: { id: 'shop-j', name: 'J. Official' },
    category: { name: 'Fashion & Apparel' },
  },
  {
    id: 'p-j-3',
    title: 'J. Janan Leather Eau De Parfum 30ml',
    description: 'Rich warm leather and spicy aromatic perfume in compact luxury bottle.',
    price: 2800,
    stock: 40,
    images: '["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600"]',
    shop: { id: 'shop-j', name: 'J. Official' },
    category: { name: 'Fashion & Apparel' },
  },
  {
    id: 'p-j-4',
    title: 'J. Mika Pour Homme Aquatic Cologne',
    description: 'Fresh aquatic ocean blue eau de parfum for everyday wear.',
    price: 3300,
    stock: 15,
    images: '["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600"]',
    shop: { id: 'shop-j', name: 'J. Official' },
    category: { name: 'Fashion & Apparel' },
  },

  // MEN'S ACCESSORIES & BRACELETS
  {
    id: 'p-acc-1',
    title: 'SERASAR Mens Gold Leather Bracelet 20cm',
    description: 'Handcrafted genuine braided black leather bracelet with gold magnetic clasp.',
    price: 2499,
    stock: 15,
    images: '["https://images.unsplash.com/photo-1611591475111-c917282845c4?q=80&w=600"]',
    shop: { id: 'shop-acc', name: 'Prestige Mens Accessories' },
    category: { name: 'Bags & Accessories' },
  },
  {
    id: 'p-acc-2',
    title: 'Gold & Silver Plated Cuban Link Chain',
    description: 'Dual-tone stainless steel heavy Cuban link bracelet chain for men.',
    price: 1850,
    stock: 22,
    images: '["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600"]',
    shop: { id: 'shop-acc', name: 'Prestige Mens Accessories' },
    category: { name: 'Bags & Accessories' },
  },

  // ARTIFICIAL JEWELRY
  {
    id: 'p-jewel-1',
    title: 'Classic Gold Motif Bangle Set',
    description: '18K Gold plated artificial bangles set with intricate geometric cutwork.',
    price: 2200,
    stock: 18,
    images: '["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600"]',
    shop: { id: 'shop-jewelry', name: 'Royal Jewelry Hub' },
    category: { name: 'Artificial Jewelry' },
  },
  {
    id: 'p-jewel-2',
    title: 'Antique Classic Anja Haath Phool Bracelet',
    description: 'Traditional bridal Kundan hand harness haath phool bracelet with ring.',
    price: 2800,
    stock: 10,
    images: '["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600"]',
    shop: { id: 'shop-jewelry', name: 'Royal Jewelry Hub' },
    category: { name: 'Artificial Jewelry' },
  },

  // HOME DECORATION
  {
    id: 'p-decor-1',
    title: 'Islamic 3-Piece Calligraphy Wall Art Frame Set',
    description: '3-Piece 3D acrylic metallic calligraphy wall decoration frames set.',
    price: 3500,
    stock: 14,
    images: '["https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=600"]',
    shop: { id: 'shop-decor', name: 'Aesthetic Home Studio' },
    category: { name: 'Home Decoration' },
  },
  {
    id: 'p-decor-2',
    title: 'Rectangle 3D Metal Flower Frame',
    description: 'Handcrafted luxury gold 3D metal flower wall art frame for living room.',
    price: 4200,
    stock: 9,
    images: '["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600"]',
    shop: { id: 'shop-decor', name: 'Aesthetic Home Studio' },
    category: { name: 'Home Decoration' },
  },

  // KHAADI & TOYS GALAXY
  {
    id: 'p-khaadi-1',
    title: 'Printed Khaddar Stitched Shirt',
    description: 'Stitched casual printed khaddar shirt tunic with cuffed sleeves.',
    price: 1599,
    stock: 35,
    images: '["https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=600"]',
    shop: { id: 'shop-khaadi', name: 'Khaadi Official' },
    category: { name: 'Fashion & Apparel' },
  },
  {
    id: 'p-toys-1',
    title: 'RC Alloy Monster Truck Wireless 360 Rotatable',
    description: 'RC Alloy Monster Truck Wireless Remote Control Cross Country Drifting Toy.',
    price: 1999,
    stock: 10,
    images: '["https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=600"]',
    shop: { id: 'shop-toys', name: 'Toys Galaxy' },
    category: { name: 'Toys & Games' },
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shopId = searchParams.get('shopId');

  if (shopId) {
    const filtered = INITIAL_PRODUCTS.filter((p) => p.shop.id === shopId);
    return NextResponse.json(filtered.length > 0 ? filtered : INITIAL_PRODUCTS);
  }

  return NextResponse.json(INITIAL_PRODUCTS);
}

export async function POST(req: Request) {
  try {
    const { title, description, price, stock, image } = await req.json();

    const newP = {
      id: `p-${Date.now()}`,
      title: title || 'New Product Item',
      description: description || 'Vendor product item live on E-Mall.',
      price: parseFloat(price) || 1999,
      stock: parseInt(stock) || 10,
      images: JSON.stringify([image || 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=600']),
      shop: { id: 'shop-toys', name: 'Toys Galaxy' },
      category: { name: 'Toys & Games' },
    };

    INITIAL_PRODUCTS.unshift(newP);
    return NextResponse.json(newP, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
