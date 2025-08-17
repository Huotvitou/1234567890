export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/mongodb'; import Product from '@/models/Product'; import { requireAdmin } from '@/lib/auth';
export async function GET(_req,{params}){ await dbConnect(); const doc=await Product.findById(params.id); if(!doc) return new Response(JSON.stringify({error:'Not found'}),{status:404}); return new Response(JSON.stringify(doc),{status:200}); }
export async function PUT(req,{params}){ await dbConnect(); const guard=requireAdmin(); if(!guard.ok) return new Response(JSON.stringify({error:guard.msg}),{status:guard.status});
  const data=await req.json(); const doc=await Product.findByIdAndUpdate(params.id,data,{new:true}); return new Response(JSON.stringify(doc),{status:200}); }
export async function DELETE(_req,{params}){ await dbConnect(); const guard=requireAdmin(); if(!guard.ok) return new Response(JSON.stringify({error:guard.msg}),{status:guard.status});
  await Product.findByIdAndDelete(params.id); return new Response(JSON.stringify({ok:true}),{status:200}); }
