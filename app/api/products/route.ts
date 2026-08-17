import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get('shopId');

    let products = [];
    if (shopId) {
      products = await prisma.product.findMany({
        where: { shopId },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (products.length === 0) {
      products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Fetch products error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, price, stock, shopId, image } = await req.json();

    if (!title || !price) {
      return NextResponse.json({ error: 'Title and Price are required' }, { status: 400 });
    }

    let shop = null;
    if (shopId) {
      shop = await prisma.shop.findUnique({
        where: { id: shopId },
      });
    }

    if (!shop) {
      shop = await prisma.shop.findFirst();
    }

    if (!shop) {
      const defaultUser = await prisma.user.create({
        data: {
          name: 'Haris Khan',
          email: `seller_${Date.now()}@emall.com`,
          password: 'hashedpassword',
          role: 'SELLER',
          shop: {
            create: {
              name: 'Toys Galaxy',
              slug: `toys-galaxy-${Date.now()}`,
            },
          },
        },
        include: { shop: true },
      });
      shop = defaultUser.shop!;
    }

    const defaultImage = 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=500';
    const productImage = image || defaultImage;

    const product = await prisma.product.create({
      data: {
        title,
        description: description || '',
        price: parseFloat(price),
        stock: parseInt(stock) || 1,
        images: JSON.stringify([productImage]),
        shopId: shop.id,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Create Product Error:', error);
    return NextResponse.json({ error: error.message || 'Error creating product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}
