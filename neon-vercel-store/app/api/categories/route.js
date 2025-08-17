export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/mongodb'; import Category from '@/models/Category'; import { requireAdmin } from '@/lib/auth';
export async function GET(){ await dbConnect(); const items=await Category.find({}).sort({createdAt:-1}); return new Response(JSON.stringify(items),{status:200}); }
export async function POST(req){ await dbConnect(); const guard=requireAdmin(); if(!guard.ok) return new Response(JSON.stringify({error:guard.msg}),{status:guard.status});
  const data=await req.json(); const created=await Category.create(data); return new Response(JSON.stringify(created),{status:201}); }
