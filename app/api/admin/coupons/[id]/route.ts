
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = params;
        await Coupon.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Coupon deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete coupon' }, { status: 500 });
    }
}
