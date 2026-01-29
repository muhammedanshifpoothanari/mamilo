
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET() {
    try {
        await connectToDatabase();
        const customers = await Customer.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, customers });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch customers' }, { status: 500 });
    }
}
