import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/guards";
import { User } from "@/models/User";
import { Order } from "@/models/Order";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const { response } = await requireAdmin(request);
    if (response) {
      return response;
    }

    const [totalUsers, adminUsers, totalOrders, revenue, recentUsers, recentOrders] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]),
      User.find().sort({ createdAt: -1 }).limit(5).select("-passwordHash").lean(),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        adminUsers,
        totalOrders,
        revenue: Number((revenue[0]?.total || 0).toFixed(2)),
      },
      recentUsers: recentUsers.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })),
      recentOrders: recentOrders.map((order) => ({
        id: order._id.toString(),
        customer: order.customerSnapshot,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
      })),
    });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Could not load admin summary." }, { status: 500 });
  }
}
