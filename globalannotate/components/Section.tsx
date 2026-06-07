import { cn } from "@/lib/utils";

export default function Section({
  id,
  className,
  children,
  bleed = false,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", className)}
    >
      {bleed ? children : <div className="container-wide">{children}</div>}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && <span className="badge">{eyebrow}</span>}
      <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-ink-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
