'use client';
import { useEffect, useState } from 'react';
export default function AdminPage(){
  const [logged,setLogged]=useState(false);
  const [form,setForm]=useState({email:'',password:''});
  const [list,setList]=useState([]);
  const [editing,setEditing]=useState(null);
  const [data,setData]=useState({name:'',price:'',category:'Steam',image:'',description:''});
  useEffect(()=>{ fetch('/api/products').then(r=>r.json()).then(setList); },[logged]);
  const login=async(e)=>{ e.preventDefault();
    const res=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    const js=await res.json(); if(res.ok&&js.role==='admin') setLogged(true); else alert(js.error||'Login failed'); };
  const save=async()=>{
    const res=await fetch(editing?`/api/products/${editing}`:'/api/products',{method:editing?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,price:Number(data.price)})});
    if(res.ok){ setData({name:'',price:'',category:'Steam',image:'',description:''}); setEditing(null); const items=await (await fetch('/api/products')).json(); setList(items);} else alert('Save failed'); };
  const delItem=async(id)=>{ if(!confirm('Delete?')) return; const res=await fetch(`/api/products/${id}`,{method:'DELETE'}); if(res.ok) setList(list.filter(i=>i._id!==id)); };
  if(!logged){ return (<div className="max-w-sm mx-auto mt-10 border border-neutral-800 p-6 rounded-xl">
    <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
    <form onSubmit={login} className="space-y-3">
      <input className="w-full bg-neutral-900 border border-neutral-700 rounded p-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <input className="w-full bg-neutral-900 border border-neutral-700 rounded p-2" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      <button className="w-full bg-emerald-500 text-black rounded p-2">Sign in</button>
    </form>
    <p className="text-xs text-neutral-500 mt-3">Create first admin via <code>/api/seed</code></p>
  </div>);}
  return (<div className="grid md:grid-cols-3 gap-8">
    <div className="md:col-span-1 border border-neutral-800 rounded-xl p-4">
      <h3 className="font-semibold mb-3">{editing?'Edit Product':'Add Product'}</h3>
      <div className="space-y-3">
        {['name','price','category','image'].map(k=>(
          <input key={k} className="w-full bg-neutral-900 border border-neutral-700 rounded p-2" placeholder={k} value={data[k]} onChange={e=>setData({...data,[k]:e.target.value})}/>
        ))}
        <textarea className="w-full bg-neutral-900 border border-neutral-700 rounded p-2" rows={4} placeholder="description" value={data.description} onChange={e=>setData({...data,description:e.target.value})}/>
        <button onClick={save} className="w-full bg-emerald-500 text-black rounded p-2">{editing?'Update':'Create'}</button>
      </div>
    </div>
    <div className="md:col-span-2">
      <h3 className="font-semibold mb-3">Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {list.map(p=>(<div key={p._id} className="border border-neutral-800 rounded-xl p-3">
          <img src={p.image} alt={p.name} className="h-32 w-full object-cover rounded-md"/>
          <div className="text-sm text-neutral-400 mt-1">{p.category}</div>
          <div className="font-semibold">{p.name}</div>
          <div className="text-emerald-400">${p.price}</div>
          <div className="mt-2 flex gap-2">
            <button className="px-3 py-1 border border-neutral-700 rounded" onClick={()=>{setEditing(p._id); setData({name:p.name,price:p.price,category:p.category,image:p.image,description:p.description||''});}}>Edit</button>
            <button className="px-3 py-1 bg-red-600 rounded" onClick={()=>delItem(p._id)}>Delete</button>
          </div>
        </div>))}
      </div>
    </div>
  </div>);
}
