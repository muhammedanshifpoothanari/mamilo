
import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    lastOrderDate: Date,
    cart: [
        {
            id: String,
            name: String,
            slug: String,
            price: Number,
            image: String,
            size: String,
            color: String,
            quantity: Number,
        }
    ],
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            zip: String,
            country: String,
            isDefault: { type: Boolean, default: false }
        }
    ],
    wishlist: [String], // Array of product slugs
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
