import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import catalogJson from '../data/catalog.json';
import type { Catalog, SelectionState } from '../types';
import { buildReview, type ReviewModel } from '../lib/pricing';
import { reducer, type Action } from './reducer';
import { freshSeed } from './seed';
import { clearSelection, loadSelection, saveSelection } from './persistence';

const catalog = catalogJson as unknown as Catalog;


function initState(): SelectionState {
  return loadSelection() ?? freshSeed();
}

interface BundleContextValue {
  catalog: Catalog;
  state: SelectionState;
  review: ReviewModel;
  dispatch: React.Dispatch<Action>;
  save: () => void;
  reset: () => void;
  savedAt: number | null;
}

const BundleContext = createContext<BundleContextValue | null>(null);

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const review = useMemo(() => buildReview(catalog, state), [state]);

  const save = useCallback(() => {
    if (saveSelection(state)) setSavedAt(Date.now());
  }, [state]);

  const reset = useCallback(() => {
    clearSelection();
    dispatch({ type: 'RESET' });
    setSavedAt(null);
  }, []);

  const value = useMemo<BundleContextValue>(
    () => ({ catalog, state, review, dispatch, save, reset, savedAt }),
    [state, review, save, reset, savedAt],
  );

  return <BundleContext.Provider value={value}>{children}</BundleContext.Provider>;
}

export function useBundle(): BundleContextValue {
  const ctx = useContext(BundleContext);
  if (!ctx) throw new Error('useBundle must be used within <BundleProvider>');
  return ctx;
}
