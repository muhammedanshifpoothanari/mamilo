
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function GET() {
    try {
        await connectToDatabase();
        const coupons = await Coupon.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, coupons });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await connectToDatabase();

        const coupon = await Coupon.create({
            code: body.code,
            discountType: body.discountType,
            value: Number(body.value),
            minPurchase: Number(body.minPurchase) || 0,
            usageLimit: body.usageLimit ? Number(body.usageLimit) : null,
        });

        return NextResponse.json({ success: true, coupon }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await connectToDatabase();
        await Coupon.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}
