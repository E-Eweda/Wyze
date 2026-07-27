import type { SelectionState } from '../types';

const STORAGE_KEY = 'wyze-bundle:v1';


export function saveSelection(state: SelectionState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function loadSelection(): SelectionState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SelectionState>;
    if (!parsed || typeof parsed !== 'object') return null;
    
    return {
      quantities: parsed.quantities ?? {},
      activeVariant: parsed.activeVariant ?? {},
      selectedPlanId: parsed.selectedPlanId ?? null,
      openStep: parsed.openStep ?? null,
    };
  } catch {
    return null;
  }
}

export function clearSelection(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function hasSavedSelection(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) != null;
  } catch {
    return false;
  }
}
