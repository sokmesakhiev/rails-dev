import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { techCategories, techStack, type TechCategory, type TechIcon } from "@/data/techStack";

type Filter = "all" | TechCategory;

// Relative luminance of a 6-digit hex color (0 = black, 1 = white).
const luminance = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// The section uses the dark palette, so black logos (Next.js, Vercel,
// Ollama…) take the text color and very dark brand colors are lightened
// enough to stay visible. Pure function: same output on server and client.
const brandColor = (hex: string) => {
  const l = luminance(hex);
  if (l < 0.03) return "currentColor";
  if (l < 0.12) return `color-mix(in srgb, #${hex} 65%, white)`;
  return `#${hex}`;
};

const Icon = ({ icon }: { icon: TechIcon }) => {
  if ("brand" in icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-10 w-10"
        style={{ fill: brandColor(icon.brand.hex) }}
      >
        <path d={icon.brand.path} />
      </svg>
    );
  }
  const Lucide = icon.lucide;
  return <Lucide aria-hidden="true" className="h-10 w-10 text-primary" strokeWidth={1.75} />;
};

const TechStack = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: Filter[] = ["all", ...techCategories];
  const items = filter === "all" ? techStack : techStack.filter((tech) => tech.category === filter);

  return (
    // `dark` switches this band to the dark palette from index.css, giving the
    // section its own look without hard-coded colors.
    <section id="tech-stack" className="dark py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-12 max-w-7xl mx-auto">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              {t("techStack.eyebrow")}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("techStack.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{t("techStack.subtitle")}</p>
          </div>

          <div
            role="group"
            aria-label={t("techStack.filterLabel")}
            className="flex flex-wrap gap-1 self-start rounded-xl border border-foreground/10 bg-card/50 p-1 lg:self-auto"
          >
            {filters.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  filter === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(`techStack.categories.${key}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Flex-wrap rather than grid so a short last row is centered.
            Keyed on the filter so the fade replays when the tab changes. */}
        <ul
          key={filter}
          className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto animate-fade-in"
        >
          {items.map((tech) => (
            <li
              key={tech.name}
              className="flex basis-[calc((100%-1rem)/2)] flex-col items-center rounded-xl sm:basis-[calc((100%-2rem)/3)] lg:basis-[calc((100%-3rem)/4)] xl:basis-[calc((100%-5rem)/6)] border border-foreground/10 bg-card/40 px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70"
            >
              <Icon icon={tech.icon} />
              <h3 className="mt-4 font-semibold leading-tight">{tech.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tech.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TechStack;
