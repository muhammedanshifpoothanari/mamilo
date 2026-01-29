
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Customer from '@/models/Customer';
import Lead from '@/models/Lead';

export async function GET() {
    try {
        await connectToDatabase();

        // Orders Stats
        const orderStats = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$total" },
                    totalOrders: { $count: {} },
                    avgOrderValue: { $avg: "$total" }
                }
            }
        ]);

        const totalRevenue = orderStats[0]?.totalRevenue || 0;
        const totalOrders = orderStats[0]?.totalOrders || 0;

        // Leads Stats
        const totalLeads = await Lead.countDocuments();
        const convertedLeads = await Lead.countDocuments({ converted: true });

        // Carts Stats (Active/Abandoned)
        // Assuming non-empty cart means abandoned/active
        const abandonedCarts = await Customer.countDocuments({
            cart: { $exists: true, $not: { $size: 0 } }
        });

        // Customers
        const totalCustomers = await Customer.countDocuments();

        return NextResponse.json({
            revenue: totalRevenue,
            orders: totalOrders,
            leads: totalLeads,
            abandonedCarts,
            customers: totalCustomers,
            conversionRate: totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0
        });

    } catch (error) {
        console.error("Stats fetch error", error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
