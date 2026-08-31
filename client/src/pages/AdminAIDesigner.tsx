// NOVAprint / Creative Commerce Studio: consola IA como estación de operaciones, con configuración segura y datos accionables.
import { useState, type ReactNode } from "react";
import { AlertCircle, ArrowLeft, ArrowUpRight, Check, CheckCircle2, Cpu, Eye, KeyRound, MoreHorizontal, Plus, RotateCcw, Save, Settings2, ShieldCheck, Sparkles, Trash2, Users, WandSparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { AdminSidebar } from "@/components/AdminSidebar";

const generatedDesigns = [
  { id: "AI-0081", style: "Línea esencial", product: "Termo Nova 500ml", user: "clara.martin@…", date: "Hoy, 10:31", status: "Añadido al carrito", tone: "#2563eb" },
  { id: "AI-0080", style: "Composición viva", product: "Camiseta Nova Classic", user: "leo.garcia@…", date: "Hoy, 09:14", status: "Guardado", tone: "#c7444b" },
  { id: "AI-0079", style: "Firma premium", product: "Termo Nova 500ml", user: "marta.soler@…", date: "Ayer, 18:05", status: "Convertido en pedido", tone: "#111111" },
  { id: "AI-0078", style: "Línea esencial", product: "Sudadera Nova Premium", user: "julia.costa@…", date: "Ayer, 16:40", status: "Guardado", tone: "#6a9679" },
];
const reviewRequests = [
  { id: "REQ-184", prompt: "diseño con mascota, estrellas y MAX", product: "Termo Nova 500ml", status: "Pendiente" },
  { id: "REQ-183", prompt: "estética retro con colores pastel", product: "Camiseta Nova Classic", status: "Revisada" },
  { id: "REQ-182", prompt: "composición deportiva en azul y blanco", product: "Sudadera Nova Premium", status: "Pendiente" },
];
const initialStyles = ["Minimalista", "Elegante", "Divertido", "Anime", "Floral", "Deportivo", "Gaming", "Retro", "Premium"];

export default function AdminAIDesigner() {
  const [enabled, setEnabled] = useState(true);
  const [provider, setProvider] = useState("NOVA AI Gateway");
  const [model, setModel] = useState("vision-design-v1");
  const [proposalCount, setProposalCount] = useState("3");
  const [freeGenerations, setFreeGenerations] = useState("1");
  const [userLimit, setUserLimit] = useState("12");
  const [prices, setPrices] = useState({ pack: "2,99 €", variation: "0,99 €", improve: "0,99 €" });
  const [styles, setStyles] = useState<Record<string, boolean>>(() => Object.fromEntries(initialStyles.map((style) => [style, true])));

  const saveChanges = () => toast.success("Configuración de IA guardada en modo demo.");
  const updatePrice = (key: keyof typeof prices, value: string) => setPrices((current) => ({ ...current, [key]: value }));
  const metrics = [
    { label: "Generaciones totales", value: "1.284", change: "+18,4%", icon: Sparkles },
    { label: "Este mes", value: "248", change: "+12,1%", icon: RotateCcw },
    { label: "Usuarios con IA", value: "184", change: "+9,8%", icon: Users },
    { label: "Añadidos al carrito", value: "96", change: "38,7%", icon: WandSparkles },
    { label: "Convertidos en pedidos", value: "71", change: "28,6%", icon: CheckCircle2 },
  ];

  return (
    <div className="flex min-h-screen bg-[#f1f2ef] text-[#111111]">
      <AdminSidebar active="IA Designer" />
      <div className="min-w-0 flex-1">
        <header className="flex min-h-[76px] items-center justify-between gap-4 border-b border-black/[.07] bg-[#f7f6f2] px-5 py-4 sm:px-8">
          <div className="pl-12 lg:pl-0">
            <Link href="/admin" className="mb-1 inline-flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-[.14em] text-[#9ca3af] no-underline hover:text-[#2563eb]"><ArrowLeft size={13} /> Dashboard</Link>
            <h1 className="font-display text-xl font-semibold tracking-[-.04em]">IA Designer</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className={`hidden items-center gap-2 rounded-full px-3 py-2 font-display text-[10px] font-bold sm:flex ${enabled ? "bg-[#ecfdf3] text-[#19734a]" : "bg-[#fee2e2] text-[#b91c1c]"}`}><span className={`h-2 w-2 rounded-full ${enabled ? "bg-[#22c55e]" : "bg-[#ef4444]"}`} />{enabled ? "Activo" : "Desactivado"}</span>
            <button type="button" onClick={saveChanges} className="nova-press inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-4 py-2.5 font-display text-[11px] font-bold text-white shadow-[0_8px_18px_rgba(37,99,235,.18)] hover:bg-[#1746a2]"><Save size={14} /> Guardar cambios</button>
          </div>
        </header>

        <main className="nova-admin-bg nova-scrollbar max-h-[calc(100vh-76px)] overflow-y-auto px-5 py-7 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1440px]">
            <section className="relative overflow-hidden rounded-[22px] bg-[#e8f0ff] p-6 sm:p-8">
              <div className="absolute -right-14 -top-20 h-64 w-64 rounded-full border-[24px] border-[#2563eb]/10" />
              <div className="absolute -bottom-24 right-36 h-48 w-48 rounded-full border-[18px] border-[#60a5fa]/15" />
              <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
                <div><div className="flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[.16em] text-[#2563eb]"><WandSparkles size={14} /> Centro de inteligencia creativa</div><h2 className="mt-4 max-w-[620px] font-display text-3xl font-semibold leading-[.98] tracking-[-.06em] sm:text-4xl">Controla la idea antes<br />de que se convierta en objeto.</h2><p className="mt-3 max-w-[490px] text-[12px] leading-5 text-[#4b5563]">Configura cómo NOVAprint genera, modera y convierte diseños en pedidos.</p></div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#2563eb]/15 bg-white/65 p-3 backdrop-blur-sm"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#2563eb] text-white"><Cpu size={18} /></div><div><div className="font-display text-[11px] font-bold">{provider}</div><div className="mt-1 text-[10px] text-[#6b7280]">{model} · Conexión segura</div></div><CheckCircle2 size={17} className="ml-3 text-[#22c55e]" /></div>
              </div>
            </section>

            <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}</section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
              <div className="nova-surface-flat bg-white p-5 sm:p-6">
                <div className="flex items-start justify-between"><div><span className="nova-kicker">Configuración principal</span><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.05em]">Cómo funciona tu IA.</h2></div><button type="button" onClick={() => setEnabled(!enabled)} className={`relative h-7 w-12 rounded-full transition-colors ${enabled ? "bg-[#2563eb]" : "bg-[#d1d5db]"}`} aria-label="Activar o desactivar IA"><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`} /></button></div>
                <div className="mt-7 grid gap-4 sm:grid-cols-2"><Field label="Proveedor de IA"><select value={provider} onChange={(event) => setProvider(event.target.value)} className="nova-admin-input"><option>NOVA AI Gateway</option><option>OpenAI compatible</option><option>Anthropic compatible</option></select></Field><Field label="Modelo"><select value={model} onChange={(event) => setModel(event.target.value)} className="nova-admin-input"><option>vision-design-v1</option><option>creative-image-v2</option><option>custom-provider-model</option></select></Field><Field label="Número de propuestas"><select value={proposalCount} onChange={(event) => setProposalCount(event.target.value)} className="nova-admin-input"><option>3</option><option>4</option><option>5</option></select></Field><Field label="Generaciones gratuitas"><input value={freeGenerations} onChange={(event) => setFreeGenerations(event.target.value)} className="nova-admin-input" /></Field><Field label="Límite por usuario / mes"><input value={userLimit} onChange={(event) => setUserLimit(event.target.value)} className="nova-admin-input" /><div className="mt-2 text-[10px] text-[#9ca3af]">{userLimit} generaciones por usuario</div></Field><div className="rounded-xl bg-[#f6f9ff] p-3"><div className="flex items-center gap-2 font-display text-[11px] font-bold text-[#1746a2]"><ShieldCheck size={15} /> Secretos protegidos</div><p className="mt-1.5 text-[10px] leading-4 text-[#6b7280]">La API key vive en variables de entorno del backend y nunca se muestra al cliente.</p></div></div>
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-[#f0c36d]/40 bg-[#fffaf0] p-3 text-[10px] text-[#8a6500]"><AlertCircle size={15} className="shrink-0" /> La demo no realiza llamadas externas. El gateway queda preparado para conectar el proveedor elegido.</div>
              </div>
              <div className="nova-surface-flat bg-white p-5 sm:p-6"><div className="flex items-start justify-between"><div><span className="nova-kicker">Precios / IA</span><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.05em]">Precio por acción.</h2></div><Settings2 size={18} className="text-[#9ca3af]" /></div><p className="mt-3 max-w-[360px] text-[12px] leading-5 text-[#6b7280]">Estos valores se reflejan en el resumen del configurador y pueden cambiarse sin tocar código.</p><div className="mt-7 space-y-3"><PriceField label="Pack de propuestas" note={`${proposalCount} propuestas`} value={prices.pack} onChange={(value) => updatePrice("pack", value)} /><PriceField label="Crear otra versión" note="regeneración" value={prices.variation} onChange={(value) => updatePrice("variation", value)} /><PriceField label="Mejorar diseño" note="optimización" value={prices.improve} onChange={(value) => updatePrice("improve", value)} /></div><div className="mt-6 rounded-2xl bg-[#111111] p-4 text-white"><div className="flex items-center justify-between"><span className="font-display text-[11px] font-bold uppercase tracking-[.1em] text-white/50">Coste estimado este mes</span><MoreHorizontal size={16} className="text-white/35" /></div><div className="mt-3 font-display text-3xl font-semibold tracking-[-.06em]">684,40 €</div><div className="mt-1 text-[10px] text-white/45">248 generaciones · 2,76 € de media</div></div></div>
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[1.18fr_.82fr]">
              <div className="nova-surface-flat overflow-hidden bg-white"><div className="flex items-end justify-between border-b border-black/[.07] p-5 sm:px-6"><div><span className="nova-kicker">Actividad IA</span><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.05em]">Diseños generados</h2></div><button type="button" className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold text-[#2563eb]">Ver todos <ArrowUpRight size={13} /></button></div><div className="nova-scrollbar overflow-x-auto"><table className="w-full min-w-[680px] text-left"><thead className="bg-[#fafaf8] text-[10px] font-bold uppercase tracking-[.12em] text-[#9ca3af]"><tr><th className="px-6 py-3 font-semibold">ID</th><th className="px-4 py-3 font-semibold">Estilo</th><th className="px-4 py-3 font-semibold">Producto</th><th className="px-4 py-3 font-semibold">Usuario</th><th className="px-4 py-3 font-semibold">Estado</th><th className="px-6 py-3 text-right font-semibold">Fecha</th></tr></thead><tbody className="divide-y divide-black/[.06]">{generatedDesigns.map((design) => <tr key={design.id} className="text-[11px] transition-colors hover:bg-[#fafaf8]"><td className="px-6 py-4 font-display font-bold text-[#2563eb]">{design.id}</td><td className="px-4 py-4"><span className="flex items-center gap-2 font-semibold"><span className="h-5 w-5 rounded-md" style={{ background: `${design.tone}20`, border: `2px solid ${design.tone}` }} />{design.style}</span></td><td className="px-4 py-4 text-[#6b7280]">{design.product}</td><td className="px-4 py-4 text-[#6b7280]">{design.user}</td><td className="px-4 py-4"><span className={`rounded-full px-2 py-1 text-[9px] font-bold ${design.status === "Convertido en pedido" ? "bg-[#ecfdf3] text-[#19734a]" : design.status === "Añadido al carrito" ? "bg-[#e8f0ff] text-[#2563eb]" : "bg-[#f1f2ef] text-[#59636f]"}`}>{design.status}</span></td><td className="px-6 py-4 text-right text-[#9ca3af]">{design.date}</td></tr>)}</tbody></table></div></div>
              <div className="nova-surface-flat bg-white p-5 sm:p-6"><div className="flex items-start justify-between"><div><span className="nova-kicker">Moderación</span><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.05em]">Solicitudes a revisar</h2></div><span className="rounded-full bg-[#fff7e6] px-2.5 py-1 font-display text-[10px] font-bold text-[#9a6700]">2 pendientes</span></div><div className="mt-6 space-y-3">{reviewRequests.map((request) => <div key={request.id} className="rounded-xl border border-black/[.07] p-3"><div className="flex items-center justify-between"><span className="font-display text-[10px] font-bold text-[#2563eb]">{request.id}</span><span className={`rounded-full px-2 py-1 text-[9px] font-bold ${request.status === "Pendiente" ? "bg-[#fff7e6] text-[#9a6700]" : "bg-[#ecfdf3] text-[#19734a]"}`}>{request.status}</span></div><p className="mt-2 line-clamp-1 text-[11px] font-semibold">“{request.prompt}”</p><p className="mt-1 text-[10px] text-[#9ca3af]">{request.product}</p><div className="mt-3 flex gap-2"><button type="button" onClick={() => toast.success(`${request.id} marcada como revisada.`)} className="flex-1 rounded-lg bg-[#f1f2ef] py-2 font-display text-[10px] font-bold text-[#59636f] hover:bg-[#e8f0ff] hover:text-[#2563eb]"><Eye className="mr-1 inline" size={12} /> Revisar</button><button type="button" onClick={() => toast.info("Solicitud archivada en modo demo.")} className="grid h-8 w-8 place-items-center rounded-lg bg-[#f1f2ef] text-[#9ca3af] hover:bg-[#fee2e2] hover:text-[#dc2626]" aria-label="Eliminar solicitud"><Trash2 size={13} /></button></div></div>)}</div><button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-black/10 py-2.5 font-display text-[10px] font-bold text-[#59636f] hover:border-[#2563eb] hover:text-[#2563eb]">Ver historial de solicitudes <ArrowUpRight size={13} /></button></div>
            </section>

            <section className="mt-5 grid gap-5 pb-10 xl:grid-cols-[1fr_.78fr]"><div className="nova-surface-flat bg-white p-5 sm:p-6"><div className="flex items-start justify-between"><div><span className="nova-kicker">Biblioteca de estilos</span><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.05em]">Lo que la IA puede crear.</h2></div><button type="button" onClick={() => toast.success("Nuevo estilo listo para definir.")} className="inline-flex items-center gap-1.5 rounded-full bg-[#111111] px-3 py-2 font-display text-[10px] font-bold text-white hover:bg-[#2563eb]"><Plus size={13} /> Nuevo estilo</button></div><div className="mt-6 flex flex-wrap gap-2">{Object.entries(styles).map(([styleName, activeStyle]) => <button type="button" key={styleName} onClick={() => setStyles((current) => ({ ...current, [styleName]: !current[styleName] }))} className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-semibold transition-colors ${activeStyle ? "border-[#9ab8ef] bg-[#e8f0ff] text-[#1746a2]" : "border-black/10 bg-white text-[#9ca3af]"}`}><span className={`grid h-4 w-4 place-items-center rounded-full ${activeStyle ? "bg-[#2563eb] text-white" : "bg-[#e5e7eb]"}`}>{activeStyle && <Check size={10} />}</span>{styleName}</button>)}</div><div className="mt-6 flex items-center gap-2 border-t border-black/[.08] pt-4 text-[10px] text-[#6b7280]"><KeyRound size={14} className="text-[#2563eb]" /> Los estilos desactivados dejan de aparecer en el configurador.</div></div><div className="nova-surface-flat bg-[#111111] p-5 text-white sm:p-6"><div className="flex items-center gap-2 text-[#60a5fa]"><ShieldCheck size={17} /><span className="nova-kicker text-[#60a5fa]">Arquitectura preparada</span></div><h2 className="mt-4 font-display text-2xl font-semibold tracking-[-.05em]">Proveedor intercambiable.</h2><p className="mt-3 text-[12px] leading-5 text-white/50">El cliente solo habla con el backend. Cambiar de proveedor o modelo no cambia el editor ni la experiencia.</p><div className="mt-6 space-y-2 font-mono text-[10px] text-white/65"><div className="rounded-lg bg-white/[.07] px-3 py-2"><span className="text-[#60a5fa]">POST</span> /api/ai/generate</div><div className="rounded-lg bg-white/[.07] px-3 py-2"><span className="text-[#60a5fa]">POST</span> /api/ai/moderate</div><div className="rounded-lg bg-white/[.07] px-3 py-2"><span className="text-[#60a5fa]">GET</span> /api/ai/history</div></div><div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[10px] font-semibold text-white/70"><KeyRound size={13} /> API keys nunca expuestas</div></div></section>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({ label, value, change, icon: Icon }: { label: string; value: string; change: string; icon: typeof Sparkles }) { return <div className="nova-surface-flat bg-white p-4"><div className="flex items-start justify-between"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#e8f0ff] text-[#2563eb]"><Icon size={16} /></div><span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#19734a]"><ArrowUpRight size={11} />{change}</span></div><div className="mt-5 font-display text-2xl font-semibold tracking-[-.05em]">{value}</div><div className="mt-1 text-[10px] text-[#6b7280]">{label}</div></div>; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block"><span className="mb-2 block font-display text-[10px] font-bold uppercase tracking-[.1em] text-[#6b7280]">{label}</span>{children}</label>; }
function PriceField({ label, note, value, onChange }: { label: string; note: string; value: string; onChange: (value: string) => void }) { return <div className="flex items-center justify-between gap-3 rounded-xl bg-[#f1f2ef] px-3 py-3"><div><div className="font-display text-[11px] font-bold">{label}</div><div className="mt-1 text-[10px] text-[#9ca3af]">{note}</div></div><input value={value} onChange={(event) => onChange(event.target.value)} className="w-20 rounded-lg border border-black/10 bg-white px-2 py-2 text-right font-display text-[12px] font-bold outline-none focus:border-[#2563eb]" /></div>; }
