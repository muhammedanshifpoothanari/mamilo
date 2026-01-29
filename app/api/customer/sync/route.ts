import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Customer from '@/models/Customer';

export async function POST(req: Request) {
    try {
        const { email, name, phone } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Find customer and update/create
        const customer = await Customer.findOneAndUpdate(
            { email },
            {
                $set: {
                    name: name || 'Valued Customer', // Default if name missing
                    lastOrderDate: new Date(), // Just tracking activity effectively
                    // Only update phone if provided
                    ...(phone && { phone })
                },
                $setOnInsert: {
                    createdAt: new Date(),
                    totalOrders: 0,
                    totalSpent: 0
                }
            },
            { new: true, upsert: true }
        );

        return NextResponse.json(
            { message: 'Customer synced successfully', customer },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error syncing customer:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
