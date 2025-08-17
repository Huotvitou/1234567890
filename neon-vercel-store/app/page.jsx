export const dynamic = 'force-dynamic';
import dbConnect from '@/lib/mongodb'; import Product from '@/models/Product';
export default async function Home(){
  await dbConnect();
  const items = await Product.find({}).sort({createdAt:-1}).lean();
  return (<>
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight"><span className="text-emerald-400">Buy & Receive</span> Digital Items Instantly</h1>
        <p className="mt-4 text-neutral-300">Game Keys • DLCs • Gift Cards • Subscriptions • Software</p>
        <div className="mt-6 flex gap-3">
          <a href="#products" className="px-5 py-2 rounded bg-emerald-500 text-black font-medium">Shop Now</a>
          <a href="https://t.me/Vitouhuot" className="px-5 py-2 rounded border border-neutral-700 hover:border-emerald-500">Buy on Telegram</a>
        </div>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-emerald-900/30 to-emerald-600/10 border border-emerald-800/40 p-6">
        <div className="text-sm text-neutral-300">SELL</div><div className="text-3xl font-bold">$12.1952</div>
        <div className="mt-6 text-sm text-neutral-300">BUY</div><div className="text-3xl font-bold">$66.1249</div>
        <button className="mt-6 px-4 py-2 rounded bg-emerald-500 text-black">Confirm</button>
      </div>
    </section>
    <section id="products" className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(p=>(
          <a key={p._id} className="rounded-lg border border-neutral-800 hover:border-emerald-600/50 p-3 block">
            <img src={p.image} alt={p.name} className="h-40 w-full object-cover rounded-md"/>
            <div className="mt-2 text-sm text-neutral-400">{p.category}</div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-emerald-400">${p.price}</div>
          </a>
        ))}
      </div>
    </section>
  </>);
}
