import mongoose from 'mongoose';
const BannerSchema = new mongoose.Schema({ title:String, image:String, link:String }, { timestamps:true });
export default mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
