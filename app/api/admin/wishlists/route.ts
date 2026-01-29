
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET() {
    try {
        await connectToDatabase();
        const wishlists = await Customer.find({
            wishlist: { $exists: true, $not: { $size: 0 } },
        }).sort({ updatedAt: -1 }).limit(50);

        return NextResponse.json({ wishlists });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch wishlists' }, { status: 500 });
    }
}
