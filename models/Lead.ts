
import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    name: String,
    lastActive: { type: Date, default: Date.now },
    converted: { type: Boolean, default: false }, // If they placed an order later
    source: { type: String, default: 'checkout' } // checkouts, newsletter, etc.
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
