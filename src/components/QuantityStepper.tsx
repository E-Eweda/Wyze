import { Minus, Plus } from 'lucide-react';


export function QuantityStepper({
  value,
  min = 0,
  onIncrement,
  onDecrement,
  size = 'md',
  label,
  locked = false,
}: {
  value: number;
  min?: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
  label: string;
  locked?: boolean;
}) {
  const decDisabled = locked || value <= min;
  const incDisabled = locked;

  const btn =
    size === 'md'
      ? 'size-8 [&>svg]:size-4'
      : 'size-6 [&>svg]:size-3.5';
  const valueBox = size === 'md' ? 'w-8 text-sm' : 'w-6 text-[13px]';

  const btnBase =
    'grid place-items-center rounded-md border border-zinc-200 bg-white text-zinc-700 ' +
    'transition hover:border-zinc-300 hover:bg-zinc-50 ' +
    'disabled:cursor-not-allowed disabled:border-zinc-100 disabled:bg-zinc-50 disabled:text-zinc-300';

  return (
    <div className="inline-flex items-center gap-1.5">
      <button
        type="button"
        className={`${btnBase} ${btn}`}
        onClick={onDecrement}
        disabled={decDisabled}
        aria-label={`Decrease ${label}`}
      >
        <Minus strokeWidth={2.5} />
      </button>
      <span
        className={`text-center font-semibold tabular-nums text-zinc-900 ${valueBox}`}
        aria-live="polite"
        aria-label={`${label} quantity`}
      >
        {value}
      </span>
      <button
        type="button"
        className={`${btnBase} ${btn}`}
        onClick={onIncrement}
        disabled={incDisabled}
        aria-label={`Increase ${label}`}
      >
        <Plus strokeWidth={2.5} />
      </button>
    </div>
  );
}
