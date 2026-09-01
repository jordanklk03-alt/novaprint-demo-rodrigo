// NOVAprint / Creative Commerce Studio: control de acceso centralizado para las rutas internas.
import { LockKeyhole, Loader2, LogIn, ShieldAlert } from "lucide-react";
import { type ReactNode } from "react";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

type AdminGuardProps = { children: ReactNode };

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading, isAuthenticated } = useAuth({ redirectOnUnauthenticated: false });
  const adminQuery = trpc.admin.me.useQuery(undefined, { enabled: isAuthenticated, retry: false });

  if (loading || (isAuthenticated && adminQuery.isLoading)) {
    return <div className="grid min-h-screen place-items-center bg-[#111111] text-white"><div className="flex items-center gap-3 font-display text-sm"><Loader2 className="animate-spin text-[#60a5fa]" size={18} /> Comprobando acceso seguro…</div></div>;
  }

  if (!isAuthenticated) {
    return <div className="grid min-h-screen place-items-center bg-[#111111] px-5 text-white"><div className="w-full max-w-[420px] rounded-[24px] border border-white/10 bg-white/[.06] p-7 text-center shadow-2xl"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#2563eb] text-white"><LockKeyhole size={24} /></div><span className="mt-6 block font-display text-[10px] font-bold uppercase tracking-[.16em] text-[#60a5fa]">NOVAprint / Zona privada</span><h1 className="mt-3 font-display text-3xl font-semibold tracking-[-.06em]">Acceso administrador</h1><p className="mt-3 text-sm leading-6 text-white/50">Inicia sesión con la cuenta autorizada del propietario para entrar al panel de NOVAprint.</p><button type="button" onClick={() => startLogin()} className="nova-press mt-7 inline-flex items-center gap-2 rounded-full bg-[#60a5fa] px-5 py-3 font-display text-[12px] font-bold text-[#111111] hover:bg-white"><LogIn size={15} /> Iniciar sesión</button><p className="mt-4 text-[10px] text-white/35">Autenticación mediante Manus OAuth. No se muestran ni almacenan contraseñas en NOVAprint.</p></div></div>;
  }

  if (user?.role !== "admin" || adminQuery.error) {
    return <div className="grid min-h-screen place-items-center bg-[#111111] px-5 text-white"><div className="w-full max-w-[420px] rounded-[24px] border border-white/10 bg-white/[.06] p-7 text-center shadow-2xl"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#ef4444] text-white"><ShieldAlert size={24} /></div><span className="mt-6 block font-display text-[10px] font-bold uppercase tracking-[.16em] text-[#fca5a5]">Acceso restringido</span><h1 className="mt-3 font-display text-3xl font-semibold tracking-[-.06em]">No tienes permisos</h1><p className="mt-3 text-sm leading-6 text-white/50">Tu cuenta está autenticada, pero no tiene el rol administrador necesario para esta zona.</p><button type="button" onClick={() => window.location.assign("/")} className="nova-press mt-7 rounded-full border border-white/15 px-5 py-3 font-display text-[12px] font-bold text-white hover:bg-white/10">Volver al storefront</button></div></div>;
  }

  return <>{children}</>;
}
