import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Please enter email and password' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { shop: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        shop: user.shop,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Server error during login' }, { status: 500 });
  }
}
