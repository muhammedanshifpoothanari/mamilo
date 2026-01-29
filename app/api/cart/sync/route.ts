import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Customer from '@/models/Customer';

export async function POST(req: Request) {
    try {
        const { email, cart } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Find customer and update cart
        // Upsert is true to create if not exists (though typically customer should exist by now)
        const customer = await Customer.findOneAndUpdate(
            { email },
            {
                $set: { cart: cart }
            },
            { new: true, upsert: true }
        );

        return NextResponse.json(
            { message: 'Cart synced successfully', cart: customer.cart },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error syncing cart:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
