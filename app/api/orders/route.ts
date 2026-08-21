import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SUPABASE_URL = 'https://wuubgyclcmixhkgxefji.supabase.co/rest/v1/orders';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dWJneWNsY21peGhrZ3hlZmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMDkzNDMsImV4cCI6MjEwMjg4NTM0M30.qoHuSD1bajU-Ad1UyvWbfP9ovkFTMxC8DUFIf9Xw6Jo';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

export async function GET() {
  try {
    const res = await fetch(`${SUPABASE_URL}?select=*&order=created_at.desc`, { headers });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (e) {
    console.error('Supabase Orders GET Error:', e);
  }
  return NextResponse.json([]);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderData = {
      order_id: body.orderId,
      date: body.date,
      customer_name: body.customerName,
      customer_phone: body.customerPhone,
      customer_address: body.customerAddress,
      payment_method: body.paymentMethod,
      cart_items: body.cartItems,
      shop_breakdown: body.shopBreakdown,
      items_subtotal: body.itemsSubtotal,
      buyer_fee: body.buyerFee,
      buyer_delivery_fee: body.buyerDeliveryFee,
      total_hardwork_profit: body.totalHardworkProfit,
      total_amount: body.totalAmount,
      status: 'Pending Dispatch'
    };

    const res = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    }
  } catch (err) {
    console.error('Supabase Orders POST Error:', err);
  }
  return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
}

export async function PUT(req: Request) {
  try {
    const { orderId, status } = await req.json();
    const res = await fetch(`${SUPABASE_URL}?order_id=eq.${orderId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    }
  } catch (err) {
    console.error('Supabase Orders PUT Error:', err);
  }
  return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    if (orderId) {
      const res = await fetch(`${SUPABASE_URL}?order_id=eq.${orderId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) return NextResponse.json({ success: true });
    }
  } catch (err) {
    console.error('Supabase Orders DELETE Error:', err);
  }
  return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
}