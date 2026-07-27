import type { Product, SelectionState, Variant } from '../types';


export function selectionKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}::${variantId}` : productId;
}

export function productKeys(product: Product): string[] {
  if (product.variants?.length) {
    return product.variants.map((v) => selectionKey(product.id, v.id));
  }
  return [selectionKey(product.id)];
}

export function activeVariant(
  state: SelectionState,
  product: Product,
): Variant | undefined {
  if (!product.variants?.length) return undefined;
  const activeId = state.activeVariant[product.id] ?? product.variants[0].id;
  return (
    product.variants.find((v) => v.id === activeId) ?? product.variants[0]
  );
}

export function activeKey(state: SelectionState, product: Product): string {
  const variant = activeVariant(state, product);
  return selectionKey(product.id, variant?.id);
}

export function qtyOf(state: SelectionState, key: string): number {
  return state.quantities[key] ?? 0;
}

export function productQty(state: SelectionState, product: Product): number {
  return productKeys(product).reduce((sum, k) => sum + qtyOf(state, k), 0);
}

export function isSelected(state: SelectionState, product: Product): boolean {
  return productQty(state, product) > 0;
}
