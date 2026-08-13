'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Settings, PlusCircle, List } from 'lucide-react';

const adminNav = [
  { href: '/admin/services', label: 'Services', icon: Settings },
  { href: '/', label: 'View Site', icon: Home },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-gold/20 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <Link href="/admin/services" className="font-heading text-xl font-bold text-cream">
            <span className="text-gold">Rivers</span> Admin
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-cream"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gold/20 text-gold'
                    : 'text-cream/70 hover:bg-zinc-800 hover:text-cream'
                }`}
              >
                <Icon size={20} />
                <span className="font-button text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gold/20">
          <p className="text-cream/40 text-xs text-center font-button">
            Rivers Kitchen Admin
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-gold/20 bg-zinc-900">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-cream"
          >
            <Menu size={20} />
          </button>
          <span className="font-heading text-lg font-bold text-cream">
            <span className="text-gold">Rivers</span> Admin
          </span>
          <div className="w-10" />
        </header>

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
