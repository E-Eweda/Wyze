export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-xl bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
      {children}
    </span>
  );
}
