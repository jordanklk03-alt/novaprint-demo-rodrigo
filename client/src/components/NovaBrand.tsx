// NOVAprint / Creative Commerce Studio: wordmark editorial con símbolo N-gota y jerarquía tinta/azul.
import { assetUrls } from "@/lib/nova-data";

type NovaBrandProps = {
  inverse?: boolean;
  compact?: boolean;
};

export function NovaBrand({ inverse = false, compact = false }: NovaBrandProps) {
  return (
    <span className={`nova-brand ${inverse ? "nova-brand-inverse" : ""} ${compact ? "nova-brand-compact" : ""}`}>
      <img src={assetUrls.logo} alt="" aria-hidden="true" />
      <span className="nova-brand-copy">
        <span className="nova-brand-name">NOVA<span>print</span></span>
        {!compact && <span className="nova-brand-tagline">Hazlo tuyo.</span>}
      </span>
    </span>
  );
}
