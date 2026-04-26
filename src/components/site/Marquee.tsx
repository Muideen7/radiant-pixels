const items = [
  "Brand Systems",
  "★",
  "Web Design",
  "★",
  "Product UI",
  "★",
  "Motion",
  "★",
  "Development",
  "★",
  "Art Direction",
  "★",
];

export function Marquee() {
  return (
    <div className="border-y border-ink/15 py-8 overflow-hidden bg-paper-soft">
      <div className="marquee whitespace-nowrap font-display font-semibold text-5xl md:text-7xl">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={item === "★" ? "text-ink/40" : ""}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
