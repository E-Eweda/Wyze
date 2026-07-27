import type { Catalog, SelectionState } from '../types';
import { freshSeed } from './seed';

export type Action =
  | { type: 'SET_QTY'; key: string; qty: number; minQty?: number }
  | { type: 'INC'; key: string }
  | { type: 'DEC'; key: string; minQty?: number }
  | { type: 'SET_ACTIVE_VARIANT'; productId: string; variantId: string }
  | { type: 'SELECT_PLAN'; planId: string }
  | { type: 'OPEN_STEP'; stepId: string | null }
  | { type: 'ADVANCE'; catalog: Catalog; fromStepId: string }
  | { type: 'LOAD'; state: SelectionState }
  | { type: 'RESET' };

const clampQty = (qty: number, minQty = 0): number =>
  Math.max(minQty, Math.min(99, Math.round(qty)));

function setQty(
  quantities: SelectionState['quantities'],
  key: string,
  qty: number,
): SelectionState['quantities'] {
  const next = { ...quantities };
  if (qty <= 0) delete next[key];
  else next[key] = qty;
  return next;
}

export function reducer(state: SelectionState, action: Action): SelectionState {
  switch (action.type) {
    case 'SET_QTY': {
      const qty = clampQty(action.qty, action.minQty);
      return { ...state, quantities: setQty(state.quantities, action.key, qty) };
    }
    case 'INC': {
      const qty = clampQty((state.quantities[action.key] ?? 0) + 1);
      return { ...state, quantities: setQty(state.quantities, action.key, qty) };
    }
    case 'DEC': {
      const current = state.quantities[action.key] ?? 0;
      const qty = clampQty(current - 1, action.minQty);
      return { ...state, quantities: setQty(state.quantities, action.key, qty) };
    }
    case 'SET_ACTIVE_VARIANT':
      return {
        ...state,
        activeVariant: {
          ...state.activeVariant,
          [action.productId]: action.variantId,
        },
      };
    case 'SELECT_PLAN':
      return { ...state, selectedPlanId: action.planId };
    case 'OPEN_STEP':
      return {
        ...state,
        openStep: state.openStep === action.stepId ? null : action.stepId,
      };
    case 'ADVANCE': {
      const idx = action.catalog.steps.findIndex((s) => s.id === action.fromStepId);
      const next = action.catalog.steps[idx + 1];
      return { ...state, openStep: next ? next.id : null };
    }
    case 'LOAD':
      return action.state;
    case 'RESET':
      return freshSeed();
    default:
      return state;
  }
}
