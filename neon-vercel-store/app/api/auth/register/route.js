export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/mongodb'; import User from '@/models/User'; import bcrypt from 'bcryptjs';
export async function POST(req){ try{ await dbConnect(); const {email,password,role}=await req.json();
  const exists=await User.findOne({email}); if(exists) return new Response(JSON.stringify({error:'Email already exists'}),{status:400});
  const hashed=await bcrypt.hash(password,10); const user=await User.create({email,password:hashed,role:role||'user'});
  return new Response(JSON.stringify({ok:true,id:user._id}),{status:201}); }catch(e){ return new Response(JSON.stringify({error:e.message}),{status:500}); } }
