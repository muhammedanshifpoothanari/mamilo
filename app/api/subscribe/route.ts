import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Subscriber from '@/models/Subscriber';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json(
                { message: 'Valid email is required' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Check if already subscribed
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            if (!existing.isActive) {
                existing.isActive = true;
                await existing.save();
                return NextResponse.json(
                    { message: 'Welcome back! You have been resubscribed.' },
                    { status: 200 }
                );
            }
            return NextResponse.json(
                { message: 'You are already subscribed!' },
                { status: 409 }
            );
        }

        await Subscriber.create({ email });

        return NextResponse.json(
            { message: 'Successfully subscribed to our newsletter!' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
