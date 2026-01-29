
import mongoose from 'mongoose';

const EmailLogSchema = new mongoose.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'SENT', 'FAILED'],
        default: 'PENDING',
    },
    error: String,
    sentAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.EmailLog || mongoose.model('EmailLog', EmailLogSchema);
