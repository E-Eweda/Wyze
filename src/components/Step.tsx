import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import type { StepDef } from '../types';
import { stepIcon } from './icons';


export function Step({
  step,
  index,
  total,
  open,
  selectedCount,
  onToggle,
  children,
}: {
  step: StepDef;
  index: number;
  total: number;
  open: boolean;
  selectedCount: number;
  onToggle: () => void;
  children: ReactNode;
}) {
  const Icon = stepIcon(step.icon);
  const bodyId = `step-body-${step.id}`;

  const rule = open ? 'border-panel-line' : 'border-ink';

  const sectionRef = useRef<HTMLElement>(null);
  const prevOpen = useRef(open);
  useEffect(() => {
    const wasOpen = prevOpen.current;
    prevOpen.current = open;

    if (!open || wasOpen) return;
    if (!window.matchMedia('(max-width: 1023px)').matches) return;

    const timer = setTimeout(
      () => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      320,
    );
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <section
      ref={sectionRef}
      className={`scroll-mt-4 ${open ? 'my-1.5 rounded-lg bg-panel' : 'border-b border-ink'}`}
    >
      <div
        className="px-4 pb-2 pt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted sm:px-5"
      >
        Step {index + 1} of {total}
      </div>

      <h2 className={`border-t px-4 sm:px-5 ${rule}`}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={bodyId}
          className="flex w-full items-center justify-between gap-2 py-3 text-left sm:gap-3"
        >
          <span className="flex min-w-0 items-center gap-2 sm:gap-2.5">
            <Icon className="size-5 shrink-0 text-zinc-900" strokeWidth={1.75} />
            <span className="truncate text-[clamp(0.9375rem,4.3vw,1.125rem)] font-semibold text-zinc-900">
              {step.title}
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-[13px] font-medium text-brand sm:gap-1.5 sm:text-sm">
            {selectedCount > 0 && <span>{selectedCount} selected</span>}
            <ChevronDown
              className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`}
              strokeWidth={2.5}
            />
          </span>
        </button>
      </h2>

      
      <div
        id={bodyId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out  ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className={`overflow-hidden ${open ? '' : 'pointer-events-none'}`}>
          <div className="px-4 pb-6 pt-1 sm:px-5">{children}</div>
        </div>
      </div>
    </section>
  );
}
