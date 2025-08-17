import './globals.css';
export const metadata = { title: 'Vitou Neon Store', description: 'Digital Items' };
export default function RootLayout({ children }) {
  return (<html lang="en"><body className="min-h-screen">
    <header className="sticky top-0 z-50 bg-neutral-900/60 backdrop-blur border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-lg">🟢 Vitou Neon Store</div>
        <nav className="flex gap-4 text-sm">
          <a href="/" className="hover:text-emerald-400">Home</a>
          <a href="/admin" className="px-3 py-1 rounded bg-emerald-500 text-black hover:bg-emerald-400">Admin</a>
        </nav>
      </div>
    </header>
    <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    <footer className="text-center text-sm text-neutral-400 py-10">© 2025 Vitou Store</footer>
  </body></html>);}
