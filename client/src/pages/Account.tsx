import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Check, CreditCard, LogIn, MapPin, Package, Save, ShieldCheck, UserRound } from "lucide-react";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { PublicHeader } from "@/components/PublicHeader";
import { toast } from "sonner";

const emptyProfile = {
  displayName: "",
  contactEmail: "",
  phone: "",
  shippingName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "ES",
};

type ProfileDraft = typeof emptyProfile;

type FieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  wide?: boolean;
  maxLength?: number;
};

function Field({ label, value, placeholder, onChange, wide = false, maxLength }: FieldProps) {
  return (
    <label className={`text-[11px] font-semibold text-[#6b7280] ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      <input
        value={value}
        maxLength={maxLength}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-black/10 bg-[#fafaf8] px-3.5 py-3 text-sm outline-none transition-colors focus:border-[#2563eb]"
      />
    </label>
  );
}

function LoginCard() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">
      <PublicHeader />
      <main className="nova-container grid min-h-[calc(100vh-76px)] place-items-center py-16">
        <div className="w-full max-w-[470px] rounded-[28px] border border-black/[.07] bg-white p-8 text-center shadow-[0_18px_55px_rgba(17,17,17,.07)] sm:p-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#e8f0ff] text-[#2563eb]"><UserRound size={25} /></div>
          <span className="nova-kicker mt-6 block">NOVAprint / Tu espacio</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.07em]">Tu cuenta, tus diseños.</h1>
          <p className="mt-4 text-sm leading-6 text-[#6b7280]">Guarda tus datos de envío, revisa tus pedidos y acelera el próximo checkout.</p>
          <button type="button" onClick={() => startLogin()} className="nova-press mt-7 inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-6 py-3.5 font-display text-[12px] font-bold text-white hover:bg-[#1746a2]"><LogIn size={16} /> Iniciar sesión</button>
          <p className="mt-4 text-[11px] text-[#9ca3af]">Acceso seguro mediante Manus OAuth.</p>
        </div>
      </main>
    </div>
  );
}

function PaymentPanel({ methods, loading }: { methods?: Array<{ id: string; brand: string; last4: string; expMonth: number | null; expYear: number | null }>; loading: boolean }) {
  return (
    <div className="nova-surface-flat bg-[#111111] p-6 text-white sm:p-7">
      <div className="flex items-start justify-between gap-4"><div><span className="nova-kicker text-[#60a5fa]">Pago rápido</span><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.05em]">Tu método, sin repetir datos.</h2></div><CreditCard className="text-[#60a5fa]" size={21} /></div>
      <p className="mt-4 text-sm leading-6 text-white/55">Stripe puede recordar de forma segura tu método de pago. NOVAprint solo guarda el identificador del cliente; nunca el número de tarjeta ni el CVV.</p>
      {loading ? <p className="mt-5 text-[12px] text-white/45">Comprobando métodos guardados…</p> : methods?.length ? <div className="mt-5 space-y-2">{methods.map(method => <div key={method.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.06] p-4"><div className="flex items-center gap-3"><CreditCard className="text-[#60a5fa]" size={18} /><div><p className="font-display text-[12px] font-semibold capitalize">{method.brand} ···· {method.last4}</p><p className="mt-1 text-[11px] text-white/45">Vence {method.expMonth}/{method.expYear}</p></div></div><span className="text-[10px] font-semibold text-[#60a5fa]">Guardada</span></div>)}</div> : <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4"><ShieldCheck className="shrink-0 text-[#60a5fa]" size={19} /><div><p className="font-display text-[12px] font-semibold">Aún no hay método guardado</p><p className="mt-1 text-[11px] text-white/45">Se añadirá tras tu primer checkout de Stripe</p></div></div>}
    </div>
  );
}

export default function Account() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [profile, setProfile] = useState<ProfileDraft>(emptyProfile);
  const customerQuery = trpc.customer.me.useQuery(undefined, { enabled: isAuthenticated, retry: false });
  const ordersQuery = trpc.customer.orders.useQuery(undefined, { enabled: isAuthenticated, retry: false });
  const paymentMethodsQuery = trpc.customer.paymentMethods.useQuery(undefined, { enabled: isAuthenticated, retry: false });
  const saveProfile = trpc.customer.saveProfile.useMutation({
    onSuccess: () => { toast.success("Datos guardados para tu próximo checkout"); customerQuery.refetch(); },
    onError: () => toast.error("No hemos podido guardar tus datos"),
  });

  useEffect(() => {
    const serverProfile = customerQuery.data?.profile;
    if (!serverProfile) return;
    setProfile({
      displayName: serverProfile.displayName ?? user?.name ?? "",
      contactEmail: serverProfile.contactEmail ?? user?.email ?? "",
      phone: serverProfile.phone ?? "",
      shippingName: serverProfile.shippingName ?? "",
      addressLine1: serverProfile.addressLine1 ?? "",
      addressLine2: serverProfile.addressLine2 ?? "",
      city: serverProfile.city ?? "",
      region: serverProfile.region ?? "",
      postalCode: serverProfile.postalCode ?? "",
      country: serverProfile.country ?? "ES",
    });
  }, [customerQuery.data?.profile]);

  if (loading) return <div className="grid min-h-screen place-items-center bg-[#f7f6f2] text-[#111111]">Cargando tu cuenta…</div>;
  if (!isAuthenticated) return <LoginCard />;

  const update = (key: keyof ProfileDraft, value: string) => setProfile(current => ({ ...current, [key]: value }));
  const formattedName = profile.displayName || user?.name || user?.email?.split("@")[0] || "cliente";

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">
      <PublicHeader />
      <main className="nova-container pb-20 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 font-display text-[12px] font-semibold text-[#6b7280] no-underline hover:text-[#2563eb]"><ArrowLeft size={15} /> Volver a NOVAprint</Link>
        <section className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><span className="nova-kicker">NOVAprint / Mi espacio</span><h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.07em] sm:text-5xl">Hola, {formattedName}.</h1><p className="mt-3 max-w-[560px] text-sm leading-6 text-[#6b7280]">Tu información guardada estará lista cuando vuelvas a diseñar algo.</p></div><div className="flex flex-wrap items-center gap-2"><div className="rounded-full border border-black/10 bg-white px-4 py-2 font-display text-[11px] font-semibold text-[#6b7280]"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#4f9f7a]" /> Cuenta activa</div><button type="button" onClick={() => logout().then(() => toast.success("Sesión cerrada"))} className="rounded-full border border-black/10 bg-transparent px-4 py-2 font-display text-[11px] font-semibold text-[#6b7280] transition-colors hover:border-[#2563eb] hover:text-[#2563eb]">Cerrar sesión</button></div></section>
        <section className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
          <div className="nova-surface-flat bg-white p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><span className="nova-kicker">Perfil de envío</span><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.05em]">Compra más rápido.</h2></div><MapPin className="text-[#2563eb]" size={21} /></div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Field label="Nombre visible" value={profile.displayName} onChange={value => update("displayName", value)} placeholder="Tu nombre" />
              <Field label="Email de contacto" value={profile.contactEmail} onChange={value => update("contactEmail", value)} placeholder="tu@email.com" />
              <Field label="Nombre de entrega" value={profile.shippingName} onChange={value => update("shippingName", value)} placeholder="Tu nombre completo" wide={false} />
              <Field label="Teléfono" value={profile.phone} onChange={value => update("phone", value)} placeholder="+34 600 000 000" wide={false} />
              <Field label="Dirección" value={profile.addressLine1} onChange={value => update("addressLine1", value)} placeholder="Calle, número y puerta" wide />
              <Field label="Dirección (línea 2)" value={profile.addressLine2} onChange={value => update("addressLine2", value)} placeholder="Piso, escalera… (opcional)" wide />
              <Field label="Ciudad" value={profile.city} onChange={value => update("city", value)} placeholder="Madrid" />
              <Field label="Provincia" value={profile.region} onChange={value => update("region", value)} placeholder="Madrid" />
              <Field label="Código postal" value={profile.postalCode} onChange={value => update("postalCode", value)} placeholder="28001" />
              <Field label="País" value={profile.country} onChange={value => update("country", value.toUpperCase())} placeholder="ES" maxLength={2} />
            </div>
            <button type="button" disabled={saveProfile.isPending} onClick={() => saveProfile.mutate(profile)} className="nova-press mt-6 inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 font-display text-[12px] font-bold text-white hover:bg-[#2563eb]"><Save size={15} /> {saveProfile.isPending ? "Guardando…" : "Guardar datos"}</button>
          </div>
          <div className="space-y-5">
            <PaymentPanel methods={paymentMethodsQuery.data} loading={paymentMethodsQuery.isLoading} />
            <div className="nova-surface-flat bg-white p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4"><div><span className="nova-kicker">Historial</span><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.05em]">Tus pedidos.</h2></div><Package className="text-[#2563eb]" size={21} /></div>
              {ordersQuery.isLoading ? <p className="mt-6 text-sm text-[#9ca3af]">Cargando pedidos…</p> : ordersQuery.data?.length ? <div className="mt-6 space-y-3">{ordersQuery.data.map(order => <div key={order.id} className="flex items-center justify-between gap-4 rounded-2xl bg-[#fafaf8] p-4"><div><p className="font-display text-sm font-semibold">Pedido #{order.id}</p><p className="mt-1 text-[11px] text-[#9ca3af]">{new Date(order.createdAt).toLocaleDateString("es-ES")} · {order.status === "paid" ? "Pagado" : "Pendiente"}</p></div><span className="font-display text-sm font-bold">{(order.totalCents / 100).toFixed(2).replace(".", ",")} €</span></div>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-black/10 bg-[#fafaf8] p-5"><Check className="text-[#4f9f7a]" size={18} /><p className="mt-3 font-display text-sm font-semibold">Todavía no tienes pedidos.</p><p className="mt-1 text-[12px] leading-5 text-[#6b7280]">Cuando termines tu próximo diseño, aparecerá aquí.</p><Link href="/personalizar" className="mt-4 inline-flex items-center gap-2 font-display text-[12px] font-bold text-[#2563eb] no-underline">Crear un diseño <ArrowLeft className="rotate-180" size={14} /></Link></div>}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
