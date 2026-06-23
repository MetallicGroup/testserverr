import { FINISH_LABELS, FINISH_META, FINISH_ORDER, type Finish } from "@/lib/finishOptions";

interface ProductFinishPickerProps {
  value: Finish;
  onChange: (finish: Finish) => void;
  compact?: boolean;
}

export default function ProductFinishPicker({ value, onChange, compact }: ProductFinishPickerProps) {
  return (
    <div className="flex flex-wrap gap-1 max-w-full w-full">
      {FINISH_ORDER.map((key) => {
        const meta = FINISH_META[key];
        const selected = value === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            title={FINISH_LABELS[key].description}
            className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold transition-all border whitespace-nowrap ${
              selected
                ? `${meta.badge} border-current shadow-sm`
                : "bg-background text-muted-foreground border-border hover:border-primary/40"
            }`}
          >
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
