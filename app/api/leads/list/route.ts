
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Lead from '@/models/Lead';

export async function GET() {
    try {
        await connectToDatabase();
        const leads = await Lead.find({}).sort({ lastActive: -1 }).limit(50);
        return NextResponse.json({ leads });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
