import type { ReviewLine as Line } from '../lib/pricing';
import { useBundle } from '../state/BundleContext';
import { Price } from './Price';
import { ProductImage } from './ProductImage';
import { QuantityStepper } from './QuantityStepper';


export function ReviewLine({ line, showVariant }: { line: Line; showVariant: boolean }) {
  const { dispatch } = useBundle();
  return (
    <div className="flex items-center gap-2.5 py-2.5">
      <ProductImage image={line.image} size="sm" alt={line.name} />

      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-medium leading-tight text-zinc-900">
          {line.name}
          {line.nameSuffix && <span className="text-zinc-400"> {line.nameSuffix}</span>}
          {showVariant && line.variantLabel && (
            <span className="text-zinc-400"> · {line.variantLabel}</span>
          )}
        </p>
      </div>

      <QuantityStepper
        value={line.qty}
        min={line.minQty}
        locked={line.locked}
        size="sm"
        label={line.name}
        onIncrement={() => dispatch({ type: 'INC', key: line.key })}
        onDecrement={() => dispatch({ type: 'DEC', key: line.key, minQty: line.minQty })}
      />

      <div className="w-16 shrink-0 md:w-auto xl:w-16">
        <Price price={line.lineTotal} compare={line.lineCompareTotal} free={line.isFree} tone="review" />
      </div>
    </div>
  );
}
