import { ArrowRight } from 'lucide-react';

export function NextButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="mt-5 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-lg border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand-soft"
      >
        {label}
        <ArrowRight className="size-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
