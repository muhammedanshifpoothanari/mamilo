
import mongoose from 'mongoose';

const ColorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hex: { type: String, required: true },
    image: { type: String, required: true } // The image URL for this specific color variant
});

const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    image: { type: String, required: true }, // Default/Main image
    images: [String], // Additional gallery images
    description: String,

    // New Color Logic
    colors: [ColorSchema], // Changed from [String] to Array of Objects

    // Legacy fields handling (optional, or just update data)
    // colors: { type: mongoose.Schema.Types.Mixed }, 

    category: { type: String, default: 'Dresses' },
    sizes: [String],

    isNew: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    stock: { type: Number, default: 100 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
