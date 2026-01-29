import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Customer from '@/models/Customer';

export async function POST(req: Request) {
    try {
        const { email, name, phone, addresses } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        await connectToDatabase();

        const updateData: any = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;
        if (addresses) updateData.addresses = addresses;

        const customer = await Customer.findOneAndUpdate(
            { email },
            { $set: updateData },
            { new: true }
        );

        return NextResponse.json({ customer });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
