import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Subscriber from '@/models/Subscriber';

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const subscribers = await Subscriber.find({}).sort({ consentedAt: -1 });
        return NextResponse.json(subscribers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
    }
}
