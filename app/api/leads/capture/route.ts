
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Lead from '@/models/Lead';

export async function POST(req: Request) {
    try {
        const { phone, name, source = 'checkout' } = await req.json();

        if (!phone) {
            return NextResponse.json({ error: 'Phone required' }, { status: 400 });
        }

        await connectToDatabase();

        // Upsert lead: update lastActive if exists
        const lead = await Lead.findOneAndUpdate(
            { phone },
            {
                phone,
                name,
                source,
                lastActive: new Date(),
                $setOnInsert: { converted: false }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, lead });
    } catch (error) {
        console.error('Lead capture error:', error);
        return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
    }
}
