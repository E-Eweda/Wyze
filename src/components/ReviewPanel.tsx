import { useState } from 'react';
import { CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { useBundle } from '../state/BundleContext';
import { formatMoney } from '../lib/pricing';
import { GuaranteeSeal } from './GuaranteeSeal';
import { Price } from './Price';
import { ReviewLine } from './ReviewLine';

/** The right column */
export function ReviewPanel() {
  const { catalog, review, save, savedAt } = useBundle();
  const { groups, plan } = review;
  const [placed, setPlaced] = useState(false);

  const financingPill = (
    <span className="rounded-sm bg-brand px-2 py-1 text-[11px] font-semibold text-white">
      as low as {formatMoney(review.financeMonthly)}/mo
    </span>
  );
  const totalAmount = (
    <div className="flex items-baseline gap-2">
      {review.totalCompare > review.total && (
        <span className="text-[15px] text-zinc-400 line-through md:text-base xl:text-[15px]">
          {formatMoney(review.totalCompare)}
        </span>
      )}
      <span className="text-3xl font-bold text-brand md:text-[2.5rem] md:leading-none xl:text-3xl xl:leading-normal">
        {formatMoney(review.total)}
      </span>
    </div>
  );

  return (
    <aside className="rounded-xl bg-panel p-5 md:p-8 xl:p-5">
      <div className="md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-12 xl:block">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Review
          </p>
          <h2 className="mt-3 text-2xl font-medium text-ink">Your security system</h2>
          <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-ink/75">
            {catalog.reviewIntro}
          </p>

          <hr className="my-4 border-panel-line" />

          {groups.map((group) => {
            const productCounts = group.lines.reduce<Record<string, number>>((acc, l) => {
              acc[l.productId] = (acc[l.productId] ?? 0) + 1;
              return acc;
            }, {});
            return (
              <section key={group.category} className="mb-1">
                <h3 className="mb-1 text-[11px]  uppercase tracking-[0.14em] text-zinc-400">
                  {group.heading}
                </h3>
                <div className="divide-y divide-panel-line/70">
                  {group.lines.map((line) => (
                    <ReviewLine
                      key={line.key}
                      line={line}
                      showVariant={productCounts[line.productId] > 1}
                    />
                  ))}
                </div>
                <hr className="my-3 border-panel-line" />
              </section>
            );
          })}

          {plan && (
            <section className="mb-1">
              <h3 className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
                HOME MONITORING PLAN
              </h3>
              <div className="flex items-center gap-3 pb-1">
                <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-white text-brand">
                  <ShieldCheck className="size-5" strokeWidth={1.75} />
                </div>
                <p className="flex-1 text-[14px] font-semibold text-zinc-900">
                  {plan.name}
                  {plan.nameAccent && <span className="text-brand"> {plan.nameAccent}</span>}
                </p>
                <Price price={plan.price} compare={plan.comparePrice} per={plan.per} tone="review" />
              </div>
              <hr className="my-3 border-panel-line" />
            </section>
          )}

          <div className="flex items-center gap-3 pb-1">
            <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-white text-brand">
              <Truck className="size-5" strokeWidth={1.75} />
            </div>
            <p className="flex-1 text-[14px] font-medium text-zinc-900">{catalog.shipping.label}</p>
            <Price
              price={catalog.shipping.price}
              compare={catalog.shipping.comparePrice}
              free={catalog.shipping.free}
              tone="review"
            />
          </div>
        </div>
        <div>
         

          <div className="my-4 flex items-center gap-4 md:items-start xl:items-center">
            <GuaranteeSeal className="shrink-0" />
            <div className="hidden md:block xl:hidden">
              <h4 className="text-lg font-medium text-zinc-900">30-day hassle-free returns</h4>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                If you’re not totally in love with the product, we will refund you 100%.
              </p>
            </div>
            <div className="ml-auto flex flex-col items-end gap-1.5 md:hidden xl:flex">
              {financingPill}
              {totalAmount}
            </div>
          </div>

          <div className="mt-6 hidden items-center justify-between gap-4 md:flex xl:hidden">
            {financingPill}
            {totalAmount}
          </div>

          {review.savings > 0 && (
            <p className="mt-3 text-center text-[13px] font-semibold text-savings">
              Congrats! You’re saving {formatMoney(review.savings)} on your security bundle!
            </p>
          )}

          {placed ? (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-savings/10 px-4 py-3.5 text-sm font-semibold text-savings">
              <CheckCircle2 className="size-5" strokeWidth={2} />
              Order placed — thanks for building with Wyze!
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPlaced(true)}
              className="mt-4 w-full rounded-lg bg-brand-ink py-3.5 text-center text-[15px] font-semibold text-white transition hover:brightness-110 md:mt-5 md:py-4 md:text-base xl:mt-4 xl:py-3.5 xl:text-[15px]"
            >
              Checkout
            </button>
          )}

          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={save}
              className="text-[13px] font-medium text-zinc-500 underline underline-offset-2 hover:text-zinc-700"
            >
              Save my system for later
            </button>
            {savedAt && (
              <p className="mt-1 text-[12px] font-medium text-savings">
                Saved — your system will be here when you return.
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
