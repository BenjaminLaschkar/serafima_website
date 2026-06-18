import clsx from "clsx";

type Item = { label: string };
type Props = {
  items: Item[];
  className?: string;
  speed?: "slow" | "normal";
};

export function Marquee({ items, className, speed = "normal" }: Props) {
  const dur = speed === "slow" ? "45s" : "30s";
  // duplicate for seamless loop
  const list = [...items, ...items];
  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <div
        className="flex gap-16 whitespace-nowrap animate-marquee"
        style={{ animationDuration: dur }}
      >
        {list.map((it, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-16 font-display text-5xl md:text-7xl lg:text-8xl text-ivory/90"
          >
            {it.label}
            <span className="text-champagne text-3xl md:text-4xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
