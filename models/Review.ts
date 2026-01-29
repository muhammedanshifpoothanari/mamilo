
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    productId: { type: String, required: true, index: true }, // Linking to Product Slug or ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    userName: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    images: [String],
    isVerifiedPurchase: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Moderation
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
