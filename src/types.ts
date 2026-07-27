

export type CategoryId = 'cameras' | 'sensors' | 'accessories';

export interface Variant {
  id: string;
  label: string;
  swatch: string;
  image?: string;
  price: number;
  comparePrice?: number;
  listPrice?: number;
  listCompare?: number;
}

export interface Product {
  id: string;
  category: CategoryId;
  name: string;
  nameSuffix?: string;
  description?: string;
  learnMore?: boolean;
  badge?: string;
  image: string;
  variants?: Variant[];
  price?: number;
  comparePrice?: number;
  minQty?: number;
  locked?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  nameAccent?: string;
  description?: string;
  price: number;
  comparePrice?: number;
  per: string;
  badge?: string;
}

export type StepKind = 'products' | 'plan';

export interface StepDef {
  id: string;
  title: string;
  icon: string;
  kind: StepKind;
  category?: CategoryId;
  nextLabel?: string;
}

export interface Shipping {
  label: string;
  price: number;
  comparePrice?: number;
  free: boolean;
}

export interface Catalog {
  products: Product[];
  plans: Plan[];
  steps: StepDef[];
  shipping: Shipping;
  reviewIntro: string;
  financeMonths: number;
}

export interface SelectionState {
  quantities: Record<string, number>;
  activeVariant: Record<string, string>;
  selectedPlanId: string | null;
  openStep: string | null;
}
