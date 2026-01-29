
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';
import { products } from '@/lib/data';

export async function POST() {
    try {
        await connectToDatabase();

        let created = 0;
        let updated = 0;

        for (const p of products) {
            const exists = await Product.findOne({ id: p.id });
            if (!exists) {
                await Product.create({
                    ...p,
                    category: p.occasion, // Mapping occasion to category for now
                    isFeatured: p.isBestseller || p.isNew // Default featured logic
                });
                created++;
            } else {
                // Optional: Update fields if needed
                // await Product.updateOne({ id: p.id }, { ...p });
                updated++;
            }
        }

        return Response.json({ message: 'Seeding complete', created, updated });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
