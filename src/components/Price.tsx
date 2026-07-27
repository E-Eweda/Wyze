import { formatMoney } from '../lib/pricing';


export function Price({
  price,
  compare,
  per,
  free = false,
  tone = 'card',
  align = 'right',
}: {
  price: number;
  compare?: number;
  per?: string;
  free?: boolean;
  tone?: 'card' | 'review';
  align?: 'left' | 'right';
}) {
  const showCompare = compare != null && compare > price;
  const suffix = per ? `/${per}` : '';
  const isFree = free || price === 0;

  const compareColor = tone === 'card' ? 'text-compare' : 'text-zinc-400';
  const activeColor =
    tone === 'card'
      ? isFree
        ? 'text-brand'
        : 'text-zinc-900'
      : 'text-brand';


  return (
    <div
      className={`flex flex-col leading-tight md:flex-row md:items-baseline md:gap-1.5 xl:flex-col ${
        align === 'right'
          ? 'items-end text-right md:justify-end xl:items-end'
          : 'items-start text-left'
      }`}
    >
      {showCompare && (
        <span className={`text-[13px] line-through ${compareColor}`}>
          {formatMoney(compare)}
          {suffix}
        </span>
      )}
      <span className={`text-[15px] font-semibold ${activeColor}`}>
        {isFree ? 'FREE' : `${formatMoney(price)}${suffix}`}
      </span>
    </div>
  );
}
