import type { Variant } from '../types';


export function VariantSelector({
  variants,
  activeId,
  onSelect,
}: {
  variants: Variant[];
  activeId: string;
  onSelect: (variantId: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Choose a colour">
      {variants.map((v) => {
        const active = v.id === activeId;
        return (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(v.id)}
            className={`inline-flex items-center gap-1 rounded-sm border px-1.5 py-1 text-xs font-medium text-zinc-700 transition ${
              active
                ? 'border-emerald-400  bg-emerald-50'
                : 'border-zinc-200 hover:border-zinc-300'
            }`}
          >
            {v.image ? (
              <img src={v.image} alt="" className="size-4 shrink-0 object-contain" />
            ) : (
              <span
                className="size-3.5 shrink-0 rounded-full border border-black/10"
                style={{ background: v.swatch }}
              />
            )}
            <span>{v.label}</span>
          </button>
        );
      })}
    </div>
  );
}
