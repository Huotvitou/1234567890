import jwt from 'jsonwebtoken'; import { cookies } from 'next/headers';
const JWT_SECRET = process.env.JWT_SECRET;
export const signToken = (p)=>jwt.sign(p, JWT_SECRET, { expiresIn:'7d' });
export function getToken(){ const t=cookies().get('token')?.value; if(!t) return null; try{ return jwt.verify(t, JWT_SECRET);}catch{return null;}}
export function requireAdmin(){ const u=getToken(); if(!u||u.role!=='admin') return {ok:false,status:401,msg:'Unauthorized'}; return {ok:true,user:u};}
