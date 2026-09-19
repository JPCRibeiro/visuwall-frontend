import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

type Option<T extends string> = { value: T; label: string };

type SelectProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onValueChange: (value: T) => void;
  placeholder?: string;
  className?: string;
};

export default function Select<T extends string>({
  options,
  value,
  onValueChange,
  placeholder = "Selecione",
  className,
}: SelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-md border border-zinc-700/50 bg-zinc-800/50 px-3 text-sm text-white outline-none",
          className,
        )}
      >
        <span className={cn(!selected && "text-zinc-500")}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown className="size-4 opacity-50" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto scrollbar-thin rounded-md border border-zinc-800 bg-zinc-900 p-1 shadow-md">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onValueChange(opt.value);
                setOpen(false);
              }}
              className="relative flex cursor-pointer items-center rounded-sm py-1.5 pr-8 pl-2 text-sm text-white hover:bg-zinc-800"
            >
              {opt.label}
              {opt.value === value && (
                <Check className="absolute right-2 size-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}