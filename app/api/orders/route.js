import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { Order } from "@/models/Order";

export const runtime = "nodejs";

function normalizeOrderItem(item) {
  const price = Number(item?.price);
  const quantity = Math.max(1, Number(item?.quantity || 1));

  if (!Number.isFinite(price) || price < 0) {
    return null;
  }

  return {
    productSnapshot: {
      id: item?.id ? String(item.id) : undefined,
      brand: String(item?.brand || "Unknown"),
      name: String(item?.name || item?.brand || "Product"),
      description: String(item?.about || item?.description || ""),
      image: String(item?.src || item?.image || ""),
    },
    price,
    quantity,
  };
}

export async function POST(request) {
  try {
    const { user, response } = await requireAuth(request);
    if (response) {
      return response;
    }

    const body = await request.json();
    const items = Array.isArray(body?.items)
      ? body.items.map(normalizeOrderItem).filter(Boolean)
      : [];

    if (!items.length) {
      return NextResponse.json({ message: "Cart is empty." }, { status: 400 });
    }

    const total = Number(items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
    const order = await Order.create({
      user: user._id,
      customerSnapshot: {
        name: user.name,
        email: user.email,
      },
      items,
      total,
    });

    return NextResponse.json(
      { message: "Order placed successfully.", orderId: order._id.toString(), total },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message || "Could not place order." }, { status: 500 });
  }
}
