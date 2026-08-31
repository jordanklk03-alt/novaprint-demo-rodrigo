// NOVAprint / Creative Commerce Studio: storefront editorial, producto protagonista, azul de tinta solo para acciones.
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Sparkles, WandSparkles } from "lucide-react";
import { PublicHeader } from "@/components/PublicHeader";
import { assetUrls, products } from "@/lib/nova-data";

const categories = [
  { label: "Termos", description: "Tu ritual diario, con tu propia firma.", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85", tone: "#e8f0ff" },
  { label: "Camisetas", description: "Ideas que se llevan puestas.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85", tone: "#ecebe6" },
  { label: "Sudaderas", description: "Diseños con más espacio para ser tuyos.", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85", tone: "#dbeafe" },
];

const faqs = [
  "¿Cómo personalizo mi producto?",
  "¿Qué imágenes puedo subir?",
  "¿Puedo utilizar una foto?",
  "¿Puedo cambiar el diseño después?",
  "¿Cuánto tarda el envío?",
  "¿Puedo guardar mi diseño?",
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#111111]">
      <PublicHeader />
      <main>
        <section className="nova-container relative grid min-h-[650px] items-center gap-12 py-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-16 lg:py-20">
          <div className="relative z-10 nova-fade-up">
            <div className="mb-8 flex items-center gap-3"><span className="nova-kicker">Estudio de personalización</span><span className="h-px w-10 bg-[#2563eb]" /></div>
            <h1 className="font-display text-[clamp(4rem,8vw,7.8rem)] font-semibold leading-[.88] tracking-[-.08em] text-[#111111]">Hazlo<br /><span className="text-[#2563eb]">tuyo.</span></h1>
            <p className="mt-8 max-w-[380px] text-[17px] leading-7 text-[#4b5563]">Diseña termos, camisetas y sudaderas a tu manera. Empieza con una idea y termina con algo que solo puede ser tuyo.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/personalizar" className="nova-press inline-flex items-center gap-3 rounded-full bg-[#2563eb] px-6 py-3.5 font-display text-[13px] font-bold text-white no-underline shadow-[0_15px_35px_rgba(37,99,235,.22)] transition-colors hover:bg-[#1746a2]">Personalizar ahora <ArrowUpRight size={16} /></Link>
              <a href="#productos" className="nova-press inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-5 py-3.5 font-display text-[13px] font-bold text-[#111111] no-underline transition-colors hover:border-[#2563eb] hover:text-[#2563eb]">Ver productos <ArrowRight size={15} /></a>
            </div>
            <div className="mt-14 flex items-center gap-4 text-[12px] text-[#6b7280]"><span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#2563eb] shadow-sm"><Check size={14} /></span><span>Hecho para empezar en menos de un minuto</span></div>
          </div>
          <div className="relative min-h-[460px] overflow-hidden rounded-[28px] bg-[#2563eb] shadow-[0_28px_80px_rgba(37,99,235,.2)] nova-fade-up nova-delay-1">
            <img src={assetUrls.hero} alt="Productos NOVAprint preparados para personalizar" className="absolute inset-0 h-full w-full object-cover object-[72%_center]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/35 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/85 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[.12em] text-[#111111] backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-[#2563eb]" /> Tu lienzo empieza aquí</div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white"><div><p className="mb-1 font-display text-[10px] font-bold uppercase tracking-[.14em] text-white/70">NOVAprint / 001</p><p className="font-display text-xl font-semibold">Objetos con intención.</p></div><span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md"><ArrowUpRight size={18} /></span></div>
          </div>
        </section>

        <section id="como-funciona" className="border-y border-black/[.07] bg-white py-20">
          <div className="nova-container">
            <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><span className="nova-kicker">Tu proceso, sin complicaciones</span><h2 className="mt-4 max-w-[360px] font-display text-4xl font-semibold leading-[.98] tracking-[-.06em] sm:text-5xl">Tú lo imaginas.<br /><span className="text-[#2563eb]">Nosotros lo hacemos.</span></h2></div><p className="max-w-[500px] text-[15px] leading-7 text-[#6b7280]">Una herramienta visual, rápida y con el control justo para que la parte divertida empiece antes de abrir la caja.</p></div>
            <div className="mt-16 grid gap-8 border-t border-black/10 pt-7 md:grid-cols-3">
              {[{ n: "01", title: "Elige tu producto", text: "Un termo, una camiseta o una sudadera. El lienzo lo pones tú." }, { n: "02", title: "Personalízalo", text: "Sube una imagen, escribe algo o parte de uno de nuestros diseños." }, { n: "03", title: "Recíbelo en casa", text: "Te enseñamos el resultado antes de producirlo. Sin sorpresas." }].map((step, index) => <div key={step.n} className={`nova-fade-up nova-delay-${index + 1}`}><span className="font-display text-xs font-bold text-[#2563eb]">{step.n}</span><h3 className="mt-8 font-display text-2xl font-semibold tracking-[-.04em]">{step.title}</h3><p className="mt-3 max-w-[275px] text-sm leading-6 text-[#6b7280]">{step.text}</p></div>)}
            </div>
          </div>
        </section>

        <section id="productos" className="nova-container py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="nova-kicker">Elige tu lienzo</span><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.06em] sm:text-5xl">Empieza por aquí.</h2></div><Link href="/personalizar" className="inline-flex items-center gap-2 font-display text-sm font-bold text-[#2563eb] no-underline hover:text-[#1746a2]">Ver todo <ArrowRight size={16} /></Link></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {categories.map((category, index) => <Link key={category.label} href="/personalizar" className={`nova-hover group overflow-hidden rounded-[20px] border border-black/[.07] no-underline ${index === 1 ? "bg-[#ecebe6]" : index === 2 ? "bg-[#dbeafe]" : "bg-[#e8f0ff]"}`}><div className="relative h-[315px] overflow-hidden"><img src={category.image} alt={category.label} className="h-full w-full object-cover grayscale-[.18] mix-blend-multiply transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[.12em] text-[#111111]">Personalizable</span></div><div className="p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-xl font-semibold text-[#111111]">{category.label}</h3><p className="mt-1 text-sm leading-5 text-[#6b7280]">{category.description}</p></div><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#2563eb] transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span></div></div></Link>)}
          </div>
        </section>

        <section className="bg-[#111111] py-24 text-white">
          <div className="nova-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><span className="nova-kicker text-[#60a5fa]">Diseño en tiempo real</span><h2 className="mt-4 max-w-[440px] font-display text-4xl font-semibold leading-[.98] tracking-[-.06em] sm:text-5xl">El configurador es el producto.</h2><p className="mt-6 max-w-[380px] text-[15px] leading-7 text-white/55">Mueve, escala, gira y combina capas. Lo que ves es lo que recibes.</p><Link href="/personalizar" className="nova-press mt-8 inline-flex items-center gap-3 rounded-full bg-[#60a5fa] px-6 py-3.5 font-display text-[13px] font-bold text-[#111111] no-underline transition-colors hover:bg-white">Abrir configurador <WandSparkles size={16} /></Link></div><div className="relative min-h-[360px] overflow-hidden rounded-[22px] border border-white/10 bg-[#171a1e] p-3"><div className="absolute right-5 top-5 z-10 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-display text-[10px] uppercase tracking-[.12em] text-white/65 backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-[#60a5fa]" /> Vista previa</div><div className="nova-grid-line flex h-full min-h-[334px] items-center justify-center rounded-[16px] bg-[#f0f2ef]"><div className="nova-thermo nova-thermo-blue"><div className="nova-thermo-label"><span className="text-white">N</span><span className="!text-white/75">Diseña el tuyo</span></div></div><div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-3 py-2 font-display text-[10px] font-semibold uppercase tracking-[.1em] text-[#111111]">Área de impresión 01</div></div></div></div>
        </section>

        <section id="inspiracion" className="nova-container py-24"><div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-end"><div><span className="nova-kicker">Galería de inspiración</span><h2 className="mt-4 font-display text-4xl font-semibold leading-[.98] tracking-[-.06em] sm:text-5xl">Inspírate.<br /><span className="text-[#2563eb]">Después, cambia todo.</span></h2></div><div className="relative overflow-hidden rounded-[22px] bg-[#dbeafe]"><img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85" alt="Mesa de trabajo con materiales para inspirarte" className="h-[330px] w-full object-cover object-center" /><div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[.12em] text-[#111111]">Ideas para empezar</div></div></div></section>

        <section className="border-y border-black/[.07] bg-white py-20"><div className="nova-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><span className="nova-kicker">Preguntas frecuentes</span><h2 className="mt-4 max-w-[360px] font-display text-4xl font-semibold leading-[.98] tracking-[-.06em]">Todo claro antes de crear.</h2></div><div>{faqs.map((faq, index) => <div key={faq} className="border-t border-black/10"><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left font-display text-[15px] font-semibold"><span>{faq}</span><ChevronDown size={18} className={`shrink-0 text-[#2563eb] transition-transform ${openFaq === index ? "rotate-180" : ""}`} /></button>{openFaq === index && <p className="-mt-1 max-w-[560px] pb-5 text-sm leading-6 text-[#6b7280]">Puedes empezar con una imagen, una frase o un diseño predeterminado. El configurador te enseña el resultado y el precio se actualiza mientras decides.</p>}</div>)}</div></div></section>

        <section className="nova-container py-24"><div className="nova-grain relative overflow-hidden rounded-[28px] bg-[#e8f0ff] px-6 py-14 text-center sm:px-12"><div className="relative z-10 mx-auto max-w-[620px]"><Sparkles className="mx-auto mb-5 text-[#2563eb]" size={22} /><span className="nova-kicker">Tu próxima pieza empieza aquí</span><h2 className="mt-4 font-display text-4xl font-semibold leading-[.98] tracking-[-.06em] sm:text-6xl">Haz algo que no exista todavía.</h2><Link href="/personalizar" className="nova-press mt-8 inline-flex items-center gap-3 rounded-full bg-[#111111] px-6 py-3.5 font-display text-[13px] font-bold text-white no-underline transition-colors hover:bg-[#2563eb]">Crear mi diseño <ArrowUpRight size={16} /></Link></div></div></section>
      </main>
      <footer className="border-t border-black/[.07] bg-[#f7f6f2] py-10"><div className="nova-container flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="font-display text-xl font-bold tracking-[-.05em]">NOVA<span className="font-normal">print</span></div><p className="mt-2 text-sm text-[#6b7280]">Hazlo tuyo.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-[12px] font-medium text-[#6b7280]"><a href="#productos" className="hover:text-[#2563eb]">Productos</a><a href="#inspiracion" className="hover:text-[#2563eb]">Inspiración</a><a href="#como-funciona" className="hover:text-[#2563eb]">Cómo funciona</a><a href="#" className="hover:text-[#2563eb]">Privacidad</a><Link href="/admin" className="font-semibold text-[#111111] no-underline hover:text-[#2563eb]">Panel admin <ArrowUpRight className="inline" size={13} /></Link></div></div></footer>
    </div>
  );
}
