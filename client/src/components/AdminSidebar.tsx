// NOVAprint / Creative Commerce Studio: sidebar persistente de operaciones con contraste tinta y acentos de azul de tinta.
import { Link } from "wouter";
import {
  BarChart3, Box, Folder, Grid2X2, Image as ImageIcon, Layers3, LayoutDashboard, Menu, Percent, Settings2,
  ShoppingBag, Sparkles, Tag, Users, WandSparkles, X,
} from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/nova-data";
import { NovaBrand } from "@/components/NovaBrand";

const icons = { grid: Grid2X2, box: Box, wand: WandSparkles, sparkles: Sparkles, "shopping-bag": ShoppingBag, users: Users, layers: Layers3, tag: Tag, percent: Percent, image: ImageIcon, folder: Folder } as const;

type AdminSidebarProps = { active?: string };

export function AdminSidebar({ active = "Dashboard" }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" aria-label="Abrir navegación del admin" onClick={() => setOpen(true)} className="nova-press fixed left-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-[#111111] text-white shadow-xl lg:hidden">
        <Menu size={18} />
      </button>
      {open && <button aria-label="Cerrar navegación" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/30 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[258px] flex-col bg-[#111111] px-4 py-5 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-start justify-between px-3 pb-7">
          <Link href="/admin" onClick={() => setOpen(false)} className="no-underline"><NovaBrand inverse /></Link>
          <button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white lg:hidden"><X size={16} /></button>
        </div>
        <div className="mb-3 px-3 font-display text-[10px] font-bold uppercase tracking-[.18em] text-white/35">Operaciones</div>
        <nav className="nova-scrollbar flex-1 space-y-1 overflow-y-auto" aria-label="Administración">
          {navItems.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            const selected = active === item.label;
            return (
              <button key={item.label} type="button" onClick={() => setOpen(false)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-display text-[12px] font-medium transition-all ${selected ? "bg-[#2563eb] text-white shadow-[0_8px_20px_rgba(37,99,235,.22)]" : "text-white/55 hover:bg-white/[.07] hover:text-white"}`}>
                <Icon size={16} strokeWidth={selected ? 2.2 : 1.7} />
                <span>{item.label}</span>
                {item.label === "Pedidos" && <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold ${selected ? "bg-white/20 text-white" : "bg-[#2563eb] text-white"}`}>8</span>}
              </button>
            );
          })}
        </nav>
        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="mb-2 px-3 font-display text-[10px] font-bold uppercase tracking-[.18em] text-white/35">Sistema</div>
          <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-display text-[12px] font-medium text-white/55 transition-colors hover:bg-white/[.07] hover:text-white"><Settings2 size={16} strokeWidth={1.7} /> Configuración</button>
          <Link href="/" className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 font-display text-[12px] font-semibold text-[#60a5fa] no-underline transition-colors hover:bg-[#60a5fa]/10"><LayoutDashboard size={16} strokeWidth={1.7} /> Ver storefront</Link>
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/[.06] p-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#60a5fa] font-display text-xs font-bold text-[#111111]">LM</div>
          <div className="min-w-0"><div className="truncate font-display text-[12px] font-semibold">Lucía Martín</div><div className="truncate text-[11px] text-white/40">Propietaria</div></div>
          <BarChart3 className="ml-auto text-white/35" size={15} />
        </div>
      </aside>
    </>
  );
}
