type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({ eyebrow, title, align = "left", className }: Props) {
  return (
    <div
      className={[
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className ?? "",
      ].join(" ")}
    >
      {eyebrow && (
        <span className="eyebrow mb-6 inline-flex items-center gap-4">
          <span className="rule" /> {eyebrow}
        </span>
      )}
      <h2 className="font-display font-light text-display-md md:text-display-lg text-ivory text-balance">
        {title}
      </h2>
    </div>
  );
}
