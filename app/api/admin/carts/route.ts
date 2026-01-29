
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET() {
    try {
        await connectToDatabase();
        // consumers with non-empty carts
        const carts = await Customer.find({
            cart: { $exists: true, $not: { $size: 0 } },
            // optionally filter by last active < 1 hour ago? No, show all for now.
        }).sort({ updatedAt: -1 }).limit(50);

        return NextResponse.json({ carts });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch carts' }, { status: 500 });
    }
}
