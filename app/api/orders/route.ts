import { NextResponse } from 'next/server';

// Cloud In-Memory Global Orders Persistence
let globalOrders: any[] = [];

export async function GET() {
  return NextResponse.json(globalOrders);
}

export async function POST(req: Request) {
  try {
    const newOrder = await req.json();
    globalOrders = [newOrder, ...globalOrders];
    return NextResponse.json({ success: true, orders: globalOrders });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { orderId, status } = await req.json();
    globalOrders = globalOrders.map((o) => (o.orderId === orderId ? { ...o, status } : o));
    return NextResponse.json({ success: true, orders: globalOrders });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    if (orderId) {
      globalOrders = globalOrders.filter((o) => o.orderId !== orderId);
    }
    return NextResponse.json({ success: true, orders: globalOrders });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
