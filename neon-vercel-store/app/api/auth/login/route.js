export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/mongodb'; import User from '@/models/User'; import bcrypt from 'bcryptjs'; import { signToken } from '@/lib/auth'; import { cookies } from 'next/headers';
export async function POST(req){ try{ await dbConnect(); const {email,password}=await req.json();
  const user=await User.findOne({email}); if(!user) return new Response(JSON.stringify({error:'Invalid credentials'}),{status:400});
  const ok=await bcrypt.compare(password,user.password); if(!ok) return new Response(JSON.stringify({error:'Invalid credentials'}),{status:400});
  const token=signToken({id:user._id,role:user.role,email:user.email}); cookies().set('token',token,{httpOnly:true,sameSite:'lax',path:'/'});
  return new Response(JSON.stringify({ok:true,role:user.role}),{status:200}); }catch(e){ return new Response(JSON.stringify({error:e.message}),{status:500}); } }
