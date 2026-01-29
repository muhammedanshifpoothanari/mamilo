
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function POST(req: Request) {
    try {
        const { code, cartTotal } = await req.json();

        if (!code) {
            return NextResponse.json({ error: 'Code required' }, { status: 400 });
        }

        await connectToDatabase();

        const coupon = await Coupon.findOne({
            code: code.toUpperCase(),
            isActive: true
        });

        if (!coupon) {
            return NextResponse.json({ error: 'Invalid coupon' }, { status: 404 });
        }

        if (coupon.expiryDate && new Date() > coupon.expiryDate) {
            return NextResponse.json({ error: 'Coupon expired' }, { status: 400 });
        }

        if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
            return NextResponse.json({ error: `Minimum purchase of $${coupon.minPurchase} required` }, { status: 400 });
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 });
        }

        // Calculate discount
        let discount = 0;
        if (coupon.discountType === 'percentage') {
            discount = (cartTotal * coupon.value) / 100;
        } else {
            discount = coupon.value;
        }

        // Ensure discount doesn't exceed total (mostly relevant for fixed)
        discount = Math.min(discount, cartTotal);

        return NextResponse.json({
            success: true,
            discount,
            code: coupon.code,
            type: coupon.discountType,
            value: coupon.value
        });

    } catch (error) {
        return NextResponse.json({ error: 'Validation failed' }, { status: 500 });
    }
}
