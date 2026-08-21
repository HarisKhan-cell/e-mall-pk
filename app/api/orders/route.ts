import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SUPABASE_URL = 'https://wuubgyclcmixhkgxefji.supabase.co/rest/v1/orders';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dWJneWNsY21peGhrZ3hlZmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMDkzNDMsImV4cCI6MjEwMjg4NTM0M30.qoHuSD1bajU-Ad1UyvWbfP9ovkFTMxC8DUFIf9Xw6Jo';

const getHeaders = () => ({
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
});

export async function GET() {
  try {
    const res = await fetch(`${SUPABASE_URL}?select=*&order=created_at.desc`, {
      headers: getHeaders(),
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return NextResponse.json(data);
      }
    }
  } catch (e) {
    console.error('Supabase Orders GET Error:', e);
  }
  return NextResponse.json([]);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Parse cartItems and shopBreakdown safely into native JSON objects for Supabase JSONB columns
    let cartItemsObj = body.cartItems || body.cart_items || [];
    if (typeof cartItemsObj === 'string') {
      try { cartItemsObj = JSON.parse(cartItemsObj); } catch (e) {}
    }

    let shopBreakdownObj = body.shopBreakdown || body.shop_breakdown || {};
    if (typeof shopBreakdownObj === 'string') {
      try { shopBreakdownObj = JSON.parse(shopBreakdownObj); } catch (e) {}
    }

    const orderData = {
      order_id: body.orderId || body.order_id || `EMALL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: body.date || new Date().toLocaleDateString('en-PK'),
      customer_name: body.customerName || body.customer_name || 'Customer',
      customer_phone: body.customerPhone || body.customer_phone || '',
      customer_address: body.customerAddress || body.customer_address || '',
      payment_method: body.paymentMethod || body.payment_method || 'COD',
      cart_items: cartItemsObj,
      shop_breakdown: shopBreakdownObj,
      items_subtotal: Number(body.itemsSubtotal || body.items_subtotal || 0),
      buyer_fee: Number(body.buyerFee || body.buyer_fee || 50),
      buyer_delivery_fee: Number(body.buyerDeliveryFee || body.buyer_delivery_fee || 195),
      total_hardwork_profit: Number(body.totalHardworkProfit || body.total_hardwork_profit || 0),
      total_amount: Number(body.totalAmount || body.total_amount || 0),
      status: 'Pending Dispatch'
    };

    const res = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData)
    });

    const resText = await res.text();

    if (res.ok) {
      const data = JSON.parse(resText);
      return NextResponse.json({ success: true, data });
    } else {
      console.error('Supabase Orders POST Error:', res.status, resText);
      return NextResponse.json({ error: resText }, { status: res.status });
    }
  } catch (err: any) {
    console.error('Supabase Orders POST Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { orderId, status } = await req.json();
    const res = await fetch(`${SUPABASE_URL}?order_id=eq.${encodeURIComponent(orderId)}`, {
      method: 'PATCH',
      headers: getHeaders(),
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
      const res = await fetch(`${SUPABASE_URL}?order_id=eq.${encodeURIComponent(orderId)}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) return NextResponse.json({ success: true });
    }
  } catch (err) {
    console.error('Supabase Orders DELETE Error:', err);
  }
  return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
}