import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import ErrorLog from '@/models/ErrorLog';

export async function POST(req: Request) {
    try {
        const { message, stack, source } = await req.json();

        await connectToDatabase();

        const errorLog = await ErrorLog.create({
            message,
            stack,
            source,
        });

        return NextResponse.json(
            { message: 'Error logged successfully', id: errorLog._id },
            { status: 201 }
        );

    } catch (error) {
        console.error('Failed to log error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
