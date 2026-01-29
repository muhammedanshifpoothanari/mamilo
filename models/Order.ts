
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customer: {
        name: String,
        email: String,
        phone: String,
        address: {
            street: String,
            city: String,
            state: String,
            zip: String,
            country: String,
        },
    },
    items: [
        {
            productId: String,
            name: String,
            price: Number,
            quantity: Number,
            size: String,
            color: String,
            image: String,
        },
    ],
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    total: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: String,
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
