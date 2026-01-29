
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Customer from '@/models/Customer';

export async function POST(req: Request) {
    try {
        const { email, slug } = await req.json();

        if (!email || !slug) {
            return NextResponse.json({ error: 'Email and slug required' }, { status: 400 });
        }

        await connectToDatabase();

        let customer = await Customer.findOne({ email });

        if (!customer) {
            customer = await Customer.create({
                name: 'Guest',
                email: email,
                wishlist: []
            });
        }

        const wishlist = customer.wishlist || [];
        const index = wishlist.indexOf(slug);
        let action = '';

        if (index > -1) {
            // Remove
            wishlist.splice(index, 1);
            action = 'removed';
        } else {
            // Add
            wishlist.push(slug);
            action = 'added';
        }

        customer.wishlist = wishlist;
        await customer.save();

        return NextResponse.json({ success: true, action, wishlist });
    } catch (error) {
        console.error('Wishlist toggle error:', error);
        return NextResponse.json({ error: 'Failed to update wishlist' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        await connectToDatabase();
        const customer = await Customer.findOne({ email }).select('wishlist');

        return NextResponse.json({ wishlist: customer?.wishlist || [] });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
    }
}
