export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/mongodb'; import Product from '@/models/Product'; import { requireAdmin } from '@/lib/auth';
export async function GET(){ await dbConnect(); const items=await Product.find({}).sort({createdAt:-1}); return new Response(JSON.stringify(items),{status:200}); }
export async function POST(req){ await dbConnect(); const guard=requireAdmin(); if(!guard.ok) return new Response(JSON.stringify({error:guard.msg}),{status:guard.status});
  const body=await req.json(); const created=await Product.create(body); return new Response(JSON.stringify(created),{status:201}); }
