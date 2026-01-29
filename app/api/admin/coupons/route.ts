
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function GET() {
    try {
        await connectToDatabase();
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        return NextResponse.json(coupons);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch coupons' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await connectToDatabase();

        const coupon = await Coupon.create(body);
        return NextResponse.json(coupon, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Failed to create coupon' }, { status: 400 });
    }
}
