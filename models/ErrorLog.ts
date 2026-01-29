
import mongoose from 'mongoose';

const ErrorLogSchema = new mongoose.Schema({
    message: { type: String, required: true },
    stack: String,
    source: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.ErrorLog || mongoose.model('ErrorLog', ErrorLogSchema);
