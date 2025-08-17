import mongoose from 'mongoose';
const CategorySchema = new mongoose.Schema({ name:String, slug:String }, { timestamps:true });
export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
