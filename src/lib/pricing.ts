import type { Catalog, CategoryId, Plan, Product, SelectionState } from '../types';
import { productKeys, qtyOf, selectionKey } from './selection';

export interface ReviewLine {
  key: string;
  productId: string;
  name: string;
  nameSuffix?: string;
  image: string;
  variantLabel?: string;
  qty: number;
  minQty: number;
  locked: boolean;
  unitPrice: number;
  unitCompare?: number;
  lineTotal: number;
  lineCompareTotal: number;
  isFree: boolean;
}

export interface ReviewGroup {
  category: CategoryId;
  heading: string;
  lines: ReviewLine[];
}

export interface ReviewModel {
  groups: ReviewGroup[];
  plan: Plan | null;
  goodsTotal: number;
  goodsCompareTotal: number;
  total: number;
  totalCompare: number;
  savings: number;
  financeMonthly: number;
}

const CATEGORY_META: { id: CategoryId; heading: string }[] = [
  { id: 'cameras', heading: 'Cameras' },
  { id: 'sensors', heading: 'Sensors' },
  { id: 'accessories', heading: 'Accessories' },
];

export function buildReview(
  catalog: Catalog,
  state: SelectionState,
): ReviewModel {
  const groups: ReviewGroup[] = [];

  for (const { id: category, heading } of CATEGORY_META) {
    const lines: ReviewLine[] = [];

    for (const product of catalog.products.filter((p) => p.category === category)) {
      if (product.variants?.length) {
        for (const variant of product.variants) {
          const key = selectionKey(product.id, variant.id);
          const qty = qtyOf(state, key);
          if (qty <= 0) continue;
          lines.push(
            makeLine({
              key,
              product,
              image: variant.image ?? product.image,
              variantLabel: variant.label,
              qty,
              unitPrice: variant.price,
              unitCompare: variant.comparePrice,
            }),
          );
        }
      } else {
        const key = selectionKey(product.id);
        const qty = qtyOf(state, key);
        if (qty <= 0) continue;
        lines.push(
          makeLine({
            key,
            product,
            image: product.image,
            qty,
            unitPrice: product.price ?? 0,
            unitCompare: product.comparePrice,
          }),
        );
      }
    }

    if (lines.length) groups.push({ category, heading, lines });
  }

  const plan = catalog.plans.find((p) => p.id === state.selectedPlanId) ?? null;

  let goodsTotal = 0;
  let goodsCompareTotal = 0;
  for (const g of groups) {
    for (const l of g.lines) {
      goodsTotal += l.lineTotal;
      goodsCompareTotal += l.lineCompareTotal;
    }
  }

  const planPrice = plan?.price ?? 0;
  const planCompare = plan?.comparePrice ?? plan?.price ?? 0;

  const total = round2(goodsTotal + planPrice);
  const totalCompare = round2(goodsCompareTotal + planCompare);
  const savings = round2(totalCompare - total);
  const financeMonthly = round2(total / catalog.financeMonths);

  return {
    groups,
    plan,
    goodsTotal: round2(goodsTotal),
    goodsCompareTotal: round2(goodsCompareTotal),
    total,
    totalCompare,
    savings,
    financeMonthly,
  };
}

function makeLine(opts: {
  key: string;
  product: Product;
  image: string;
  variantLabel?: string;
  qty: number;
  unitPrice: number;
  unitCompare?: number;
}): ReviewLine {
  const { key, product, image, variantLabel, qty, unitPrice, unitCompare } = opts;
  const lineTotal = round2(unitPrice * qty);
  const compareUnit = unitCompare ?? unitPrice;
  return {
    key,
    productId: product.id,
    name: product.name,
    nameSuffix: product.nameSuffix,
    image,
    variantLabel,
    qty,
    minQty: product.minQty ?? 0,
    locked: product.locked ?? false,
    unitPrice,
    unitCompare,
    lineTotal,
    lineCompareTotal: round2(compareUnit * qty),
    isFree: unitPrice === 0,
  };
}

export function countSelectedProducts(
  catalog: Catalog,
  state: SelectionState,
  category: CategoryId,
): number {
  return catalog.products
    .filter((p) => p.category === category)
    .filter((p) => productKeys(p).some((k) => qtyOf(state, k) > 0)).length;
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function formatMoney(n: number): string {
  return `$${n.toFixed(2)}`;
}
