
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Customer from '@/models/Customer';

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { customer, items, total, paymentMethod, couponCode, discount } = body;

        // 1. Create or Update Customer
        let customerRecord = await Customer.findOne({ email: customer.email });

        if (!customerRecord) {
            customerRecord = await Customer.create({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                totalOrders: 0,
                totalSpent: 0,
                addresses: [customer.address]
            });
        } else {
            if (!customerRecord.phone && customer.phone) {
                customerRecord.phone = customer.phone;
            }
        }

        // 2. Create Order
        const newOrder = await Order.create({
            customer: customer,
            items: items,
            total: total,
            discount: discount || 0,
            couponCode: couponCode || null,
            paymentMethod: paymentMethod || 'COD',
            status: 'Pending',
        });

        // 3. Update Customer Stats
        customerRecord.totalOrders += 1;
        customerRecord.totalSpent += total;
        customerRecord.lastOrderDate = new Date();

        if (!customerRecord.orders) customerRecord.orders = [];
        customerRecord.orders.push(newOrder._id);

        await customerRecord.save();

        // 4. Update Coupon Usage if applied
        if (couponCode) {
            const Coupon = (await import('@/models/Coupon')).default;
            await Coupon.updateOne(
                { code: couponCode },
                { $inc: { usedCount: 1 } }
            );
        }

        return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 201 });
    } catch (error) {
        console.error('Failed to create order:', error);
        return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, orders }, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
    }
}
