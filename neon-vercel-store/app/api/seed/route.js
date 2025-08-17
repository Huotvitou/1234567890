export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/mongodb'; import User from '@/models/User'; import Product from '@/models/Product'; import bcrypt from 'bcryptjs';
const samples = Array.from({ length: 20 }).map((_, i) => ({
  name: `Sample Product ${i+1}`,
  description: 'Digital item / key / subscription',
  price: Math.floor(Math.random()*50) + 5,
  category: ['Steam','DLC','Wallet','Gift Card','Subscription'][i % 5],
  image: `https://images.unsplash.com/photo-15${(i+10)}?auto=format&fit=crop&w=800&q=60`
}));
export async function GET(){ await dbConnect();
  const adminEmail=process.env.ADMIN_EMAIL; const adminPass=process.env.ADMIN_PASSWORD||'123456';
  if(adminEmail){ const exists=await User.findOne({email:adminEmail}); if(!exists){ const hash=await bcrypt.hash(adminPass,10); await User.create({email:adminEmail,password:hash,role:'admin'});} }
  const count=await Product.countDocuments(); if(count===0) await Product.insertMany(samples);
  return new Response(JSON.stringify({ok:true,seeded:true}),{status:200}); }
