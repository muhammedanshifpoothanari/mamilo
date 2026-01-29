import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Customer from '@/models/Customer';
import Order from '@/models/Order';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        await connectToDatabase();

        const customer = await Customer.findOne({ email });
        const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 });

        return NextResponse.json({
            customer,
            orders
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}
