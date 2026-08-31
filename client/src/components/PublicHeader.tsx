// NOVAprint / Creative Commerce Studio: navegación pública aireada, editorial y orientada a crear.
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { NovaBrand } from "@/components/NovaBrand";

export function PublicHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Productos", href: "/#productos" },
    { label: "Cómo funciona", href: "/#como-funciona" },
    { label: "Inspiración", href: "/#inspiracion" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-black/[.06] bg-[#f7f6f2]/90 backdrop-blur-xl">
      <div className="nova-container flex h-[76px] items-center justify-between gap-5">
        <Link href="/" className="shrink-0 no-underline" aria-label="NOVAprint inicio">
          <NovaBrand />
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="font-display text-[13px] font-medium text-[#374151] transition-colors hover:text-[#2563eb]">
              {link.label}
            </a>
          ))}
          <Link href="/admin" className="inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-[#111111] transition-colors hover:text-[#2563eb]">
            Admin <ArrowUpRight size={14} strokeWidth={1.8} />
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/personalizar" className="nova-press hidden items-center gap-2 rounded-full bg-[#2563eb] px-5 py-3 font-display text-[12px] font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,.2)] transition-all hover:bg-[#1746a2] sm:inline-flex">
            Personalizar ahora <ArrowUpRight size={15} />
          </Link>
          <button type="button" aria-label="Abrir carrito" className="nova-press grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-[#111111] transition-colors hover:border-[#2563eb] hover:text-[#2563eb]">
            <ShoppingBag size={17} strokeWidth={1.7} />
          </button>
          <button type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-[#111111] md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-black/[.06] bg-[#f7f6f2] px-5 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-display text-sm font-medium text-[#374151] hover:bg-white">
                {link.label}
              </a>
            ))}
            <Link href="/admin" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-display text-sm font-semibold text-[#2563eb]">Abrir panel admin</Link>
          </div>
        </div>
      )}
      {location !== "/" && location !== "/personalizar" && <span className="sr-only">Navegación interna</span>}
    </header>
  );
}
