import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import EmailLog from '@/models/EmailLog';

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const emails = await EmailLog.find({}).sort({ createdAt: -1 });
        return NextResponse.json(emails);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { to, subject, body } = await req.json();
        await connectToDatabase();

        const email = await EmailLog.create({
            to,
            subject,
            body,
            status: 'PENDING'
        });

        return NextResponse.json(email);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to queue email' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, status } = await req.json();
        await connectToDatabase();

        const email = await EmailLog.findByIdAndUpdate(
            id,
            {
                status,
                sentAt: status === 'SENT' ? new Date() : undefined
            },
            { new: true }
        );

        return NextResponse.json(email);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update email' }, { status: 500 });
    }
}
