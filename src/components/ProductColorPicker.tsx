import {
  PRODUCT_COLORS,
  PRODUCT_COLOR_ORDER,
  type ProductColorId,
} from "@/lib/productColors";

interface ProductColorPickerProps {
  value: ProductColorId;
  onChange: (color: ProductColorId) => void;
}

export default function ProductColorPicker({ value, onChange }: ProductColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-1.5 max-w-full">
      {PRODUCT_COLOR_ORDER.map((id) => {
        const meta = PRODUCT_COLORS[id];
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            title={meta.label}
            aria-label={meta.label}
            aria-pressed={selected}
            className={`w-7 h-7 rounded-full shrink-0 transition-all border-2 ${
              selected
                ? "border-primary ring-2 ring-primary/40 scale-110"
                : "border-border hover:border-primary/50 hover:scale-105"
            }`}
            style={{ backgroundColor: meta.hex }}
          />
        );
      })}
    </div>
  );
}
