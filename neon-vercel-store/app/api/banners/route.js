export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/mongodb'; import Banner from '@/models/Banner'; import { requireAdmin } from '@/lib/auth';
export async function GET(){ await dbConnect(); const items=await Banner.find({}).sort({createdAt:-1}); return new Response(JSON.stringify(items),{status:200}); }
export async function POST(req){ await dbConnect(); const guard=requireAdmin(); if(!guard.ok) return new Response(JSON.stringify({error:guard.msg}),{status:guard.status});
  const data=await req.json(); const created=await Banner.create(data); return new Response(JSON.stringify(created),{status:201}); }
