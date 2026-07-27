import { Check } from 'lucide-react';
import type { Plan } from '../types';
import { Badge } from './Badge';
import { Price } from './Price';

export function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`relative flex min-w-0 items-center gap-4 rounded-lg border bg-white p-4 text-left transition ${
        selected
          ? 'border-brand shadow-[0_0_0_1px_var(--color-brand)]'
          : 'border-zinc-200 hover:border-zinc-300'
      }`}
    >
      <span
        className={`grid size-5 shrink-0 place-items-center rounded-full border-2 transition ${
          selected ? 'border-brand bg-brand text-white' : 'border-zinc-300 text-transparent'
        }`}
      >
        <Check className="size-3" strokeWidth={3} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-[15px] font-semibold text-zinc-900">
            {plan.name}
            {plan.nameAccent && <span className="text-brand"> {plan.nameAccent}</span>}
          </h3>
          {plan.badge && <Badge>{plan.badge}</Badge>}
        </div>
        {plan.description && (
          <p className="mt-0.5 text-[13px] leading-snug text-zinc-500">{plan.description}</p>
        )}
      </div>

      <Price price={plan.price} compare={plan.comparePrice} per={plan.per} tone="review" />
    </button>
  );
}
