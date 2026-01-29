import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

export async function POST() {
    try {
        // Connect to MongoDB
        await connectToDatabase();

        // Get all collections
        const collections = mongoose.connection.collections;

        // Drop all collections
        const dropPromises = Object.keys(collections).map(async (collectionName) => {
            return collections[collectionName].drop().catch(() => {
                // Ignore errors if collection doesn't exist
                console.log(`Collection ${collectionName} doesn't exist or already dropped`);
            });
        });

        await Promise.all(dropPromises);

        return NextResponse.json({
            success: true,
            message: 'Database reset successfully. All collections dropped.'
        });
    } catch (error) {
        console.error('Error resetting database:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to reset database' },
            { status: 500 }
        );
    }
}
