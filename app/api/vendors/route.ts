import { NextResponse } from 'next/server';

let globalVendors: any[] = [];

export async function GET() {
  return NextResponse.json(globalVendors);
}

export async function POST(req: Request) {
  try {
    const newVendor = await req.json();
    globalVendors = [newVendor, ...globalVendors];
    return NextResponse.json({ success: true, vendors: globalVendors });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save vendor' }, { status: 500 });
  }
}