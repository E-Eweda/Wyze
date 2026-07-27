import type { Product } from '../types';
import { useBundle } from '../state/BundleContext';
import { activeKey, activeVariant, isSelected, qtyOf } from '../lib/selection';
import { Badge } from './Badge';
import { Price } from './Price';
import { ProductImage } from './ProductImage';
import { QuantityStepper } from './QuantityStepper';
import { VariantSelector } from './VariantSelector';


export function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useBundle();

  const variant = activeVariant(state, product);
  const key = activeKey(state, product);
  const qty = qtyOf(state, key);
  const selected = isSelected(state, product);
  const minQty = product.minQty ?? 0;
  const price = variant?.listPrice ?? variant?.price ?? product.price ?? 0;
  const compare = variant?.listCompare ?? variant?.comparePrice ?? product.comparePrice;

  return (
    <article
      className={`relative flex h-full items-center gap-4 rounded-[10px] border bg-white p-4 transition md:flex-col md:items-stretch xl:flex-row xl:items-center ${
        selected
          ? 'border-brand shadow-[0_0_0_1px_var(--color-brand)]'
          : 'border-zinc-200'
      }`}
    >
      {product.badge && (
        <div className="absolute left-3 top-3 z-10">
          <Badge>{product.badge}</Badge>
        </div>
      )}

      <div className="size-28 shrink-0 md:h-44 md:w-full xl:size-28">
        <ProductImage image={variant?.image ?? product.image} size="fill" alt={product.name} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="text-[15px] font-semibold leading-snug text-zinc-900">
          {product.name}
          {product.nameSuffix && (
            <span className="ml-1 font-normal text-zinc-400">{product.nameSuffix}</span>
          )}
        </h3>

        {product.description && (
          <p className="text-[13px] leading-snug text-zinc-500">
            {product.description}{' '}
            {product.learnMore && (
              <a
                href="#learn-more"
                onClick={(e) => e.preventDefault()}
                className="font-medium text-brand underline underline-offset-2"
              >
                Learn More
              </a>
            )}
          </p>
        )}

        {product.variants && product.variants.length > 0 && (
          <div className="mt-1">
            <VariantSelector
              variants={product.variants}
              activeId={variant?.id ?? product.variants[0].id}
              onSelect={(variantId) =>
                dispatch({ type: 'SET_ACTIVE_VARIANT', productId: product.id, variantId })
              }
            />
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-1 pt-4">
          <QuantityStepper
            value={qty}
            min={minQty}
            locked={product.locked}
            label={product.name}
            onIncrement={() => dispatch({ type: 'INC', key })}
            onDecrement={() => dispatch({ type: 'DEC', key, minQty })}
          />
          <Price price={price} compare={compare} tone="card" />
        </div>
      </div>
    </article>
  );
}
