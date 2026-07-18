export type GrowthPoint = {
  label: string;
  value: number;
};

const DEFAULT_DATA: GrowthPoint[] = [
  { label: "2023 Q1", value: 4 },
  { label: "2023 Q2", value: 12 },
  { label: "2023 Q3", value: 18 },
  { label: "2023 Q4", value: 28 },
  { label: "2024", value: 52 },
  { label: "2025", value: 89 },
  { label: "2026", value: 120 },
];

export type GrowthChartProps = {
  data?: GrowthPoint[];
  title?: string;
  unit?: string;
};

/**
 * Lightweight SVG line chart — SaaS metrics aesthetic for "memories logged".
 */
export function GrowthChart({
  data = DEFAULT_DATA,
  title = "Memories logged",
  unit = "entries",
}: GrowthChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const w = 400;
  const h = 160;
  const padX = 24;
  const padY = 20;
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;

  const points = data.map((d, i) => {
    const x = padX + (i / Math.max(data.length - 1, 1)) * innerW;
    const y = padY + innerH - (d.value / max) * innerH;
    return { ...d, x, y };
  });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const area =
    path +
    ` L ${points[points.length - 1].x.toFixed(1)} ${(padY + innerH).toFixed(1)}` +
    ` L ${points[0].x.toFixed(1)} ${(padY + innerH).toFixed(1)} Z`;

  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-[var(--card-shadow)]">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="font-serif text-xl text-foreground">{title}</h2>
        <span className="text-xs text-muted">
          {data[data.length - 1]?.value ?? 0} {unit}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${title} growth chart`}
      >
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B3435C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#B3435C" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padX}
            x2={w - padX}
            y1={padY + innerH * (1 - t)}
            y2={padY + innerH * (1 - t)}
            stroke="#e5e0d8"
            strokeWidth="1"
          />
        ))}
        <path d={area} fill="url(#growthFill)" />
        <path
          d={path}
          fill="none"
          stroke="#B3435C"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p) => (
          <circle
            key={p.label}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#faf9f6"
            stroke="#B3435C"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="mt-2 flex justify-between gap-1 text-[10px] text-muted sm:text-xs">
        {data.map((d) => (
          <span key={d.label} className="truncate text-center">
            {d.label}
          </span>
        ))}
      </div>
    </section>
  );
}
