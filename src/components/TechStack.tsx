import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { techGroups, type TechIcon } from "@/data/techStack";

// Relative luminance of a 6-digit hex color (0 = black, 1 = white).
const luminance = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// On the light background, black logos (Next.js, Vercel, Ollama…) follow the
// text color and very light ones (Hotwire yellow, React cyan) are darkened
// enough to read. Pure function, so server and client render the same.
const brandColor = (hex: string) => {
  const l = luminance(hex);
  if (l < 0.03) return "currentColor";
  if (l > 0.5) return `color-mix(in srgb, #${hex} 60%, black)`;
  return `#${hex}`;
};

const Icon = ({ icon }: { icon: TechIcon }) => {
  if ("brand" in icon) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0" style={{ fill: brandColor(icon.brand.hex) }}>
        <path d={icon.brand.path} />
      </svg>
    );
  }
  const Lucide = icon.lucide;
  return <Lucide aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />;
};

const TechStack = () => {
  const { t } = useTranslation();

  return (
    <section id="tech-stack" className="py-20 bg-background border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            {t("techStack.eyebrow")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{t("techStack.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("techStack.subtitle")}</p>
        </div>

        <ol className="max-w-6xl mx-auto space-y-5">
          {techGroups.map((group, index) => (
            <li
              key={group.key}
              className="grid gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs transition-shadow hover:shadow-md lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm font-semibold text-primary" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(`techStack.groups.${group.key}.title`)}
                  </h3>
                </div>
                <p className="mt-3 text-muted-foreground">{t(`techStack.groups.${group.key}.description`)}</p>
                <p className="mt-4 text-sm">
                  <span className="font-medium text-foreground">{t("techStack.usedIn")}: </span>
                  {group.projects.map((project, i) => (
                    // The comma stays attached to its link so a line never starts
                    // with one; the space after it stays outside so lines can wrap.
                    <Fragment key={project}>
                      <span className="whitespace-nowrap">
                        <Link to="/projects" className="text-primary hover:underline underline-offset-4">
                          {project}
                          <ArrowUpRight className="ml-0.5 inline h-3 w-3 align-baseline" aria-hidden="true" />
                        </Link>
                        {i < group.projects.length - 1 && <span className="text-muted-foreground">,</span>}
                      </span>{" "}
                    </Fragment>
                  ))}
                </p>
              </div>

              <ul className="flex flex-wrap content-start gap-2.5 lg:col-span-7">
                {group.tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground"
                  >
                    <Icon icon={tool.icon} />
                    {tool.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default TechStack;
