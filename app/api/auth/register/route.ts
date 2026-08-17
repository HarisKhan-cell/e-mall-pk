import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role, shopName } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'SELLER' && !shopName) {
      return NextResponse.json({ error: 'Shop Name is required for Sellers.' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role === 'SELLER' ? 'SELLER' : 'BUYER',
        ...(role === 'SELLER' && shopName
          ? {
              shop: {
                create: {
                  name: shopName,
                  slug: shopName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                },
              },
            }
          : {}),
      },
      include: {
        shop: true,
      },
    });

    return NextResponse.json(
      { message: 'User registered successfully!', userId: user.id, role: user.role },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: error.message || 'Server error occurred' }, { status: 500 });
  }
}
