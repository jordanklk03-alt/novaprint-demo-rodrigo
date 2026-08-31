// NOVAprint / Creative Commerce Studio: AI Designer como estación visual reutilizable, sin repetir herramientas manuales del configurador.
import { ChangeEvent, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, ImagePlus, Loader2, Palette, Sparkles, Upload, WandSparkles, X } from "lucide-react";

type AIDesignerModalProps = {
  open: boolean;
  onClose: () => void;
  onUseDesign: (proposal: AIProposal) => void;
};

export type AIProposal = {
  id: string;
  name: string;
  mode: string;
  mark: string;
  tone: string;
  prompt: string;
};

const suggestions = ["Hazlo minimalista y elegante", "Estilo anime", "Colores pastel", "Estilo retro", "Diseño deportivo", "Estilo floral", "Estilo gaming", "Diseño divertido", "Blanco y negro", "Estilo premium"];
const recipients = ["Para mí", "Pareja", "Amigo/a", "Niño/a", "Familia", "Empresa", "Regalo"];
const styles = ["Minimalista", "Elegante", "Divertido", "Anime", "Floral", "Deportivo", "Gaming", "Retro", "Infantil", "Profesional"];
const aiColors = [{ label: "Azul", value: "#2563eb" }, { label: "Blanco", value: "#ffffff" }, { label: "Negro", value: "#111111" }, { label: "Rosa", value: "#e5a9b6" }, { label: "Verde", value: "#6a9679" }];
const proposalStyles = [
  { name: "Línea esencial", mode: "Minimalista", mark: "N", tone: "#2563eb" },
  { name: "Composición viva", mode: "Creativo", mark: "✦", tone: "#c7444b" },
  { name: "Firma premium", mode: "Premium", mark: "✳", tone: "#111111" },
];

export function AIDesignerModal({ open, onClose, onUseDesign }: AIDesignerModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [screen, setScreen] = useState<"prompt" | "guided" | "loading" | "results">("prompt");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [recipient, setRecipient] = useState("");
  const [style, setStyle] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>(["#2563eb", "#ffffff"]);
  const [wantsText, setWantsText] = useState("");
  const [requestedText, setRequestedText] = useState("");
  const [requiredElement, setRequiredElement] = useState("");
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);

  if (!open) return null;

  const appendSuggestion = (suggestion: string) => {
    setDescription((current) => current ? `${current}, ${suggestion.toLowerCase()}` : suggestion);
  };

  const readImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const toggleColor = (value: string) => setSelectedColors((current) => current.includes(value) ? current.filter((color) => color !== value) : [...current, value]);

  const createPromptFromGuide = () => {
    const parts = [recipient && `para ${recipient.toLowerCase()}`, style && `estilo ${style.toLowerCase()}`, selectedColors.length && `en ${selectedColors.map((color) => aiColors.find((item) => item.value === color)?.label.toLowerCase()).join(" y ")}`, wantsText === "Sí" && requestedText && `con el texto ${requestedText}`, requiredElement && `incluyendo ${requiredElement}`].filter(Boolean);
    setDescription(`Diseño ${parts.join(", ")}.`);
    setScreen("prompt");
  };

  const createDesigns = () => {
    setScreen("loading");
    window.setTimeout(() => setScreen("results"), 1500);
  };

  const proposals: AIProposal[] = proposalStyles.map((proposal, index) => ({
    id: `ai-${index + 1}`,
    ...proposal,
    prompt: description || "Diseño original para Termo Nova 500ml",
  }));

  const selectProposal = (proposal: AIProposal) => {
    setSelectedProposal(proposal.id);
    onUseDesign(proposal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-[#111111]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div role="dialog" aria-modal="true" aria-labelledby="ai-designer-title" className="nova-scrollbar max-h-[94vh] w-full max-w-[980px] overflow-y-auto rounded-t-[26px] bg-[#f7f6f2] shadow-[0_30px_100px_rgba(17,17,17,.28)] sm:rounded-[26px]">
        <header className="flex items-center justify-between border-b border-black/[.08] px-5 py-4 sm:px-7"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#2563eb] text-white shadow-[0_8px_20px_rgba(37,99,235,.2)]"><Sparkles size={18} /></div><div><div className="nova-kicker">NOVAprint / AI Designer</div><h2 id="ai-designer-title" className="mt-1 font-display text-lg font-semibold tracking-[-.04em]">Crea tu diseño con IA</h2></div></div><button type="button" aria-label="Cerrar AI Designer" onClick={onClose} className="nova-press grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-[#6b7280] hover:text-[#111111]"><X size={16} /></button></header>

        {screen === "prompt" && <div className="grid gap-0 lg:grid-cols-[.86fr_1.14fr]"><div className="border-b border-black/[.08] p-5 sm:p-7 lg:border-b-0 lg:border-r"><p className="max-w-[370px] text-[15px] leading-6 text-[#4b5563]">Cuéntanos qué quieres y nosotros crearemos una propuesta para ti.</p><div className="mt-7"><div className="mb-2 flex items-center justify-between"><label className="font-display text-[11px] font-bold uppercase tracking-[.11em]" htmlFor="ai-upload">Tu referencia <span className="font-normal normal-case tracking-normal text-[#9ca3af]">(opcional)</span></label>{imagePreview && <span className="text-[10px] font-semibold text-[#2563eb]">Imagen lista</span>}</div><button id="ai-upload" type="button" onClick={() => fileRef.current?.click()} className="flex w-full items-center gap-4 rounded-2xl border border-dashed border-[#9ab8ef] bg-[#f6f9ff] p-4 text-left transition-colors hover:border-[#2563eb] hover:bg-[#e8f0ff]"><span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white text-[#2563eb]">{imagePreview ? <img src={imagePreview} alt="Vista previa de referencia" className="h-full w-full object-cover" /> : <ImagePlus size={20} />}</span><span><span className="block font-display text-[12px] font-bold">{imagePreview ? "Cambiar imagen" : "Sube una foto, logo o imagen"}</span><span className="mt-1 block text-[10px] leading-4 text-[#6b7280]">JPG, JPEG, PNG o WEBP · También puedes empezar desde cero.</span></span><Upload className="ml-auto shrink-0 text-[#2563eb]" size={16} /></button><input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={readImage} className="hidden" /></div><button type="button" onClick={() => setScreen("guided")} className="nova-press mt-4 flex w-full items-center justify-between rounded-2xl border border-black/10 bg-white p-4 text-left transition-colors hover:border-[#2563eb]"><span className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#f1f2ef] text-[#2563eb]"><WandSparkles size={16} /></span><span><span className="block font-display text-[12px] font-bold">No sé qué quiero</span><span className="mt-1 block text-[10px] text-[#6b7280]">Te hacemos unas preguntas sencillas.</span></span></span><ChevronRight size={16} className="text-[#9ca3af]" /></button></div><div className="p-5 sm:p-7"><div className="flex items-end justify-between"><div><span className="nova-kicker">Paso 01 / Idea</span><label htmlFor="ai-description" className="mt-2 block font-display text-xl font-semibold tracking-[-.04em]">¿Cómo quieres que sea tu diseño?</label></div><span className="font-display text-[10px] font-bold text-[#9ca3af]">{description.length}/400</span></div><textarea id="ai-description" value={description} maxLength={400} onChange={(event) => setDescription(event.target.value)} placeholder="Ejemplo: quiero un diseño divertido con mi perro en el centro, estrellas alrededor, colores azul y blanco y que ponga MAX en letras grandes." className="mt-5 min-h-[148px] w-full resize-none rounded-2xl border border-black/10 bg-white p-4 text-[13px] leading-6 outline-none transition-colors placeholder:text-[#aeb4bb] focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10" /><div className="mt-5"><div className="flex items-center justify-between"><span className="font-display text-[11px] font-bold uppercase tracking-[.11em] text-[#6b7280]">Prueba una sugerencia</span><span className="text-[10px] text-[#9ca3af]">Clic para añadir</span></div><div className="mt-3 flex flex-wrap gap-2">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => appendSuggestion(suggestion)} className="nova-press rounded-full border border-black/10 bg-white px-3 py-2 text-[10px] font-semibold text-[#59636f] transition-colors hover:border-[#9ab8ef] hover:bg-[#e8f0ff] hover:text-[#2563eb]">{suggestion}</button>)}</div></div><div className="mt-7 flex items-center justify-between border-t border-black/[.08] pt-5"><div><div className="font-display text-[12px] font-bold">3 propuestas diferentes</div><div className="mt-1 text-[10px] text-[#6b7280]">Pack de generación · 2,99 €</div></div><button type="button" onClick={createDesigns} className="nova-press inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-3 font-display text-[12px] font-bold text-white shadow-[0_10px_22px_rgba(37,99,235,.2)] hover:bg-[#1746a2]">Crear diseños <ArrowRight size={15} /></button></div></div></div>}

        {screen === "guided" && <div className="p-5 sm:p-8"><div className="flex items-start justify-between gap-4"><div><span className="nova-kicker">Asistente de diseño</span><h3 className="mt-2 font-display text-3xl font-semibold tracking-[-.06em]">Vamos paso a paso.</h3><p className="mt-2 text-sm text-[#6b7280]">No necesitas saber cómo pedirlo. Solo cuéntanos lo esencial.</p></div><button type="button" onClick={() => setScreen("prompt")} className="inline-flex items-center gap-2 text-[11px] font-bold text-[#6b7280] hover:text-[#2563eb]"><ArrowLeft size={14} /> Volver</button></div><div className="mt-8 grid gap-5 md:grid-cols-2"><GuideQuestion label="¿Para quién es el producto?" options={recipients} value={recipient} onChange={setRecipient} /><GuideQuestion label="¿Qué estilo prefieres?" options={styles} value={style} onChange={setStyle} /><div className="nova-surface-flat bg-white p-4"><div className="font-display text-[11px] font-bold uppercase tracking-[.1em] text-[#6b7280]">¿Qué colores quieres?</div><div className="mt-3 flex flex-wrap gap-2">{aiColors.map((color) => <button type="button" key={color.value} onClick={() => toggleColor(color.value)} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-semibold ${selectedColors.includes(color.value) ? "border-[#2563eb] bg-[#e8f0ff] text-[#1746a2]" : "border-black/10 text-[#6b7280]"}`}><span className="h-4 w-4 rounded-full border border-black/10" style={{ background: color.value }} />{color.label}</button>)}</div></div><div className="nova-surface-flat bg-white p-4"><div className="font-display text-[11px] font-bold uppercase tracking-[.1em] text-[#6b7280]">¿Quieres añadir texto?</div><div className="mt-3 flex gap-2"><button type="button" onClick={() => setWantsText("Sí")} className={`rounded-full px-4 py-2 text-[11px] font-bold ${wantsText === "Sí" ? "bg-[#2563eb] text-white" : "bg-[#f1f2ef] text-[#6b7280]"}`}>Sí</button><button type="button" onClick={() => { setWantsText("No"); setRequestedText(""); }} className={`rounded-full px-4 py-2 text-[11px] font-bold ${wantsText === "No" ? "bg-[#111111] text-white" : "bg-[#f1f2ef] text-[#6b7280]"}`}>No</button></div>{wantsText === "Sí" && <input value={requestedText} onChange={(event) => setRequestedText(event.target.value)} placeholder="¿Qué quieres que diga?" className="mt-3 w-full border-0 border-b border-black/15 bg-transparent pb-2 text-[12px] outline-none focus:border-[#2563eb]" />}</div><div className="nova-surface-flat bg-white p-4 md:col-span-2"><label htmlFor="ai-required" className="font-display text-[11px] font-bold uppercase tracking-[.1em] text-[#6b7280]">¿Hay algún elemento que quieras incluir?</label><input id="ai-required" value={requiredElement} onChange={(event) => setRequiredElement(event.target.value)} placeholder="Ejemplo: estrellas alrededor y una pequeña luna" className="mt-3 w-full border-0 border-b border-black/15 bg-transparent pb-2 text-[12px] outline-none focus:border-[#2563eb]" /></div></div><div className="mt-8 rounded-2xl bg-[#e8f0ff] p-4 text-[12px] leading-5 text-[#1746a2]"><span className="font-display font-bold">Perfecto.</span> Vamos a crear un diseño {recipient ? `para ${recipient.toLowerCase()}` : "a tu medida"}{style ? `, estilo ${style.toLowerCase()}` : ""}{selectedColors.length ? `, en ${selectedColors.map((color) => aiColors.find((item) => item.value === color)?.label.toLowerCase()).join(" y ")}` : ""}{wantsText === "Sí" && requestedText ? `, con el texto ${requestedText}` : ""}.</div><div className="mt-6 flex justify-end"><button type="button" onClick={createPromptFromGuide} className="nova-press inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-3 font-display text-[12px] font-bold text-white hover:bg-[#1746a2]">Usar esta idea <ArrowRight size={15} /></button></div></div>}

        {screen === "loading" && <div className="flex min-h-[480px] items-center justify-center p-8"><div className="max-w-[420px] text-center"><div className="relative mx-auto grid h-24 w-24 place-items-center rounded-[28px] bg-[#e8f0ff] text-[#2563eb]"><div className="absolute inset-0 animate-ping rounded-[28px] bg-[#60a5fa]/20" /><Sparkles className="relative" size={30} /></div><h3 className="mt-8 font-display text-3xl font-semibold tracking-[-.06em]">Estamos creando tu diseño...</h3><p className="mt-3 text-sm leading-6 text-[#6b7280]">La idea está pasando por el estudio. No cierres esta ventana.</p><div className="mx-auto mt-8 max-w-[270px] space-y-3 text-left text-[11px]">{["Analizando tu idea", "Preparando la composición", "Creando propuestas", "Casi terminado..."] .map((step, index) => <div key={step} className="flex items-center gap-3"><span className={`grid h-5 w-5 place-items-center rounded-full ${index < 2 ? "bg-[#2563eb] text-white" : "bg-[#e8f0ff] text-[#2563eb]"}`}>{index < 2 ? <Check size={12} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}</span><span className={index < 2 ? "font-semibold text-[#374151]" : "text-[#9ca3af]"}>{step}</span></div>)}</div></div></div>}

        {screen === "results" && <div className="p-5 sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="nova-kicker">Resultados / 3 propuestas</span><h3 className="mt-2 font-display text-3xl font-semibold tracking-[-.06em]">Elige un punto de partida.</h3><p className="mt-2 text-sm text-[#6b7280]">Puedes seguir editando cada propuesta manualmente en el configurador.</p></div><div className="flex gap-2"><button type="button" onClick={() => setScreen("prompt")} className="nova-press rounded-full border border-black/10 bg-white px-3 py-2 font-display text-[10px] font-bold text-[#6b7280] hover:border-[#2563eb] hover:text-[#2563eb]">Editar idea</button><button type="button" onClick={createDesigns} className="nova-press inline-flex items-center gap-2 rounded-full bg-[#111111] px-3 py-2 font-display text-[10px] font-bold text-white hover:bg-[#2563eb]"><WandSparkles size={13} /> Crear otra versión · 0,99 €</button></div></div><div className="mt-7 grid gap-4 md:grid-cols-3">{proposals.map((proposal, index) => <div key={proposal.id} className={`nova-surface-flat group bg-white p-3 transition-all ${selectedProposal === proposal.id ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "hover:border-[#9ab8ef]"}`}><div className="relative flex min-h-[215px] items-center justify-center overflow-hidden rounded-[14px] bg-[#f1f2ef]" style={{ background: `radial-gradient(circle at 50% 38%, #fff 0%, ${index === 1 ? "#fff0f1" : index === 2 ? "#e7e7e4" : "#e8f0ff"} 65%, #dfe3e7 100%)` }}><span className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-1 font-display text-[9px] font-bold uppercase tracking-[.1em] text-[#6b7280]">0{index + 1}</span><div className="nova-thermo"><div className="nova-thermo-label"><span style={{ color: proposal.tone }}>{proposal.mark}</span><span>{proposal.name}</span></div>{imagePreview && <img src={imagePreview} alt="Referencia aplicada" className="absolute left-[26px] top-[126px] z-[3] h-[74px] w-[74px] rounded-xl object-cover opacity-80" />}</div></div><div className="p-2 pt-4"><div className="flex items-center justify-between gap-2"><div><h4 className="font-display text-[13px] font-bold">{proposal.name}</h4><p className="mt-1 text-[10px] text-[#6b7280]">{proposal.mode}</p></div><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e8f0ff] text-[#2563eb]"><Palette size={14} /></span></div><button type="button" onClick={() => selectProposal(proposal)} className="nova-press mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] px-3 py-2.5 font-display text-[11px] font-bold text-white hover:bg-[#1746a2]">Usar este diseño <ArrowRight size={14} /></button><div className="mt-2 grid grid-cols-2 gap-2"><button type="button" onClick={() => { setDescription(proposal.prompt); setScreen("prompt"); }} className="rounded-lg bg-[#f1f2ef] py-2 text-[10px] font-bold text-[#6b7280] hover:text-[#2563eb]">Editar</button><button type="button" onClick={createDesigns} className="rounded-lg bg-[#f1f2ef] py-2 text-[10px] font-bold text-[#6b7280] hover:text-[#2563eb]">Regenerar</button></div></div></div>)}</div><div className="mt-7 flex flex-wrap items-center gap-2 border-t border-black/[.08] pt-5"><span className="mr-1 font-display text-[10px] font-bold uppercase tracking-[.1em] text-[#6b7280]">Acciones sobre el diseño</span><button type="button" onClick={createDesigns} className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-2 text-[10px] font-bold text-[#59636f] hover:border-[#2563eb] hover:text-[#2563eb]"><Sparkles size={13} /> Mejorar diseño · 0,99 €</button><button type="button" onClick={() => setScreen("prompt")} className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-2 text-[10px] font-bold text-[#59636f] hover:border-[#2563eb] hover:text-[#2563eb]"><Palette size={13} /> Cambiar estilo</button></div></div>}
      </div>
    </div>
  );
}

function GuideQuestion({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return <div className="nova-surface-flat bg-white p-4"><div className="font-display text-[11px] font-bold uppercase tracking-[.1em] text-[#6b7280]">{label}</div><div className="mt-3 flex flex-wrap gap-2">{options.map((option) => <button type="button" key={option} onClick={() => onChange(option)} className={`rounded-full px-3 py-2 text-[10px] font-bold transition-colors ${value === option ? "bg-[#2563eb] text-white" : "bg-[#f1f2ef] text-[#6b7280] hover:bg-[#e8f0ff] hover:text-[#2563eb]"}`}>{option}</button>)}</div></div>;
}
