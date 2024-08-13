// models/Creator.js
import mongoose from 'mongoose';

const CreatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  verified: { type: Boolean, default: false },
  socialLinks: { type: Map, of: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.models.Creator || mongoose.model('Creator', CreatorSchema);
