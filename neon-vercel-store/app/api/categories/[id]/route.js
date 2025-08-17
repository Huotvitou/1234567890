export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/mongodb'; import Category from '@/models/Category'; import { requireAdmin } from '@/lib/auth';
export async function PUT(req,{params}){ await dbConnect(); const guard=requireAdmin(); if(!guard.ok) return new Response(JSON.stringify({error:guard.msg}),{status:guard.status});
  const data=await req.json(); const doc=await Category.findByIdAndUpdate(params.id,data,{new:true}); return new Response(JSON.stringify(doc),{status:200}); }
export async function DELETE(_req,{params}){ await dbConnect(); const guard=requireAdmin(); if(!guard.ok) return new Response(JSON.stringify({error:guard.msg}),{status:guard.status});
  await Category.findByIdAndDelete(params.id); return new Response(JSON.stringify({ok:true}),{status:200}); }
