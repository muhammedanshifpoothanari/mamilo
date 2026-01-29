import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import ErrorLog from '@/models/ErrorLog';

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const logs = await ErrorLog.find({}).sort({ timestamp: -1 }).limit(100);
        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }
}
