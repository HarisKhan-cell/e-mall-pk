import { NextResponse } from 'next/server';

const CLOUD_BIN_URL = 'https://api.jsonbin.io/v3/b/66c4c021ad19ca34f8997a38';
const CLOUD_KEY = '$2a$10$MvXpL/k4yQ6QxO3l3x1y3eW1x3v3w3x3y3z3a3b3c3d3e3f3g';

let BASE_PRODUCTS: any[] = [
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

  // --- LAMA (13) ---
  {
    id: 'lama-1',
    title: 'SHADOW TEXTURED SHIRT',
    description: 'LAMA Shadow textured button down shirt.',
    price: 6950,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800'])
  },
  {
    id: 'lama-2',
    title: 'EMBROIDERED DOBBY SHIRT',
    description: 'Fine embroidered dobby cotton shirt.',
    price: 6450,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800'])
  },
  {
    id: 'lama-3',
    title: 'STRIPED JACQUARD SHIRT',
    description: 'Luxury striped jacquard weave button shirt.',
    price: 8450,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800'])
  },
  {
    id: 'lama-4',
    title: 'EVERYDAY TEE',
    description: 'LAMA classic everyday cotton crew tee.',
    price: 4950,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800'])
  },
  {
    id: 'lama-5',
    title: 'OVERSIZED TEE',
    description: 'Heavyweight dropped shoulder oversized tee.',
    price: 3950,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800'])
  },
  {
    id: 'lama-6',
    title: 'HOTEL METROPOLE TEE',
    description: 'Minimalist chest logo streetwear tee.',
    price: 3450,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800'])
  },
  {
    id: 'lama-7',
    title: 'SEA BUCKTHORN TEE',
    description: 'Botanical dye relaxed cotton crew tee.',
    price: 3450,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800'])
  },
  {
    id: 'lama-8',
    title: 'PLEATED WAIST TEE',
    description: 'Couture pleated waist accent top.',
    price: 5950,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800'])
  },
  {
    id: 'lama-9',
    title: 'BANANA ROAD OPENER TEE',
    description: 'Graphic print casual cotton tee.',
    price: 3950,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800'])
  },
  {
    id: 'lama-10',
    title: 'HENLEY CREW TEE',
    description: 'Classic 3-button placket henley tee.',
    price: 4950,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800'])
  },
  {
    id: 'lama-11',
    title: 'TEXTURED BLOUSON KNIT TOP',
    description: 'Blouson sleeve knit top with rib trim.',
    price: 5450,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=800'])
  },
  {
    id: 'lama-12',
    title: 'ASSYMETRICAL CUT TEE',
    description: 'Modern asymmetrical hem casual tee.',
    price: 4950,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800'])
  },
  {
    id: 'lama-13',
    title: 'FUNNEL NECK KNIT TOP',
    description: 'Chic funnel neck winter knit top.',
    price: 4946,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'LAMA', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800'])
  },

  // --- BEAUTY & ACCESSORIES (4) ---
  {
    id: 'beauty-1',
    title: '9-Piece Powder Puff Set – Green',
    description: 'Delicate & soft multi-purpose powder puff set.',
    price: 754,
    category: { name: 'Perfumes & Accessories' },
    shop: { name: 'Color Moor', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800'])
  },
  {
    id: 'beauty-2',
    title: 'Rivaj Photo Focus Foundation (30ml)',
    description: 'Flawless photo focus liquid foundation 30ml.',
    price: 1645,
    category: { name: 'Perfumes & Accessories' },
    shop: { name: 'Rivaj', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=800'])
  },
  {
    id: 'beauty-3',
    title: 'J. Wasim Akram 502 Perfume',
    description: 'Signature 502 fragrance by Junaid Jamshed.',
    price: 350,
    category: { name: 'Perfumes & Accessories' },
    shop: { name: 'J. Junaid Jamshed', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800'])
  },
  {
    id: 'beauty-4',
    title: 'Flormar Waterproof Eyeliner Pencil',
    description: 'Long-lasting waterproof eyeliner pencil.',
    price: 1060,
    category: { name: 'Perfumes & Accessories' },
    shop: { name: 'Flormar', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?q=80&w=800'])
  },

  // --- BREAKOUT ACCESSORIES (2) ---
  {
    id: 'acc-1',
    title: 'SHOULDER BAG',
    description: 'Compact faux leather shoulder bag.',
    price: 3249,
    category: { name: 'Bags & Accessories' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800'])
  },
  {
    id: 'acc-2',
    title: 'LEATHER WALLET',
    description: 'Genuine leather bi-fold compact wallet.',
    price: 1349,
    category: { name: 'Bags & Accessories' },
    shop: { name: 'Breakout Official', commissionRate: 5.0 },
    images: JSON.stringify(['https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800'])
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
  try {
    const res = await fetch(CLOUD_BIN_URL, {
      headers: { 'X-Master-Key': CLOUD_KEY }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.record) && data.record.length > 0) {
        return NextResponse.json(data.record);
      }
    }
  } catch (e) {
    console.error('Cloud fetch fallback:', e);
  }

  return NextResponse.json(BASE_PRODUCTS);
}

export async function POST(req: Request) {
  try {
    const newProduct = await req.json();
    
    let currentList = BASE_PRODUCTS;
    try {
      const res = await fetch(CLOUD_BIN_URL, { headers: { 'X-Master-Key': CLOUD_KEY } });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.record)) currentList = data.record;
      }
    } catch (e) {}

    const updatedList = [newProduct, ...currentList];

    await fetch(CLOUD_BIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': CLOUD_KEY
      },
      body: JSON.stringify(updatedList)
    });

    return NextResponse.json({ success: true, products: updatedList });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add product to Cloud' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    let currentList = BASE_PRODUCTS;
    try {
      const res = await fetch(CLOUD_BIN_URL, { headers: { 'X-Master-Key': CLOUD_KEY } });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.record)) currentList = data.record;
      }
    } catch (e) {}

    const updatedList = currentList.filter((p) => p.id !== id);

    // Save updated list to Cloud Bin
    await fetch(CLOUD_BIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': CLOUD_KEY
      },
      body: JSON.stringify(updatedList)
    });

    return NextResponse.json({ success: true, products: updatedList });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete product from Cloud' }, { status: 500 });
  }
}
