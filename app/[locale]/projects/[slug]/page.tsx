
import { content } from "@/app/components/hooks/content";
import EmblaCarousel from "@/app/components/utilities/Carousel";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const getProjectKey = (slug: string) => {
  if (slug === "realtime-chat-app") return "realtimeChatApp";
  if (slug === "expense-tracker") return "expenseTracker";
  return "todoApp";
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug,locale } = await params;
  const project = content.projects.find((a) => a.slug === slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations("projectPage");
  const tProjects = await getTranslations("projects");
  const key = getProjectKey(project.slug);
  const isRTL = locale === "ar";
  const translatedProject = {
    name: tProjects(`${key}.name`),
    description: tProjects.rich(`${key}.description`, {
      name: (chunks) => <span className="text-foreground">{chunks}</span>,
    }),
    longDescription: tProjects(`${key}.longDescription`),
    features: Object.values(tProjects.raw(`${key}.features`) as Record<string, string>),
    highlights: Object.values(tProjects.raw(`${key}.highlights`) as Record<string, string>),
    contribution: tProjects(`${key}.contribution`),
  };

  return (
    <main className="w-full text-foreground font-space px-6 py-8 md:px-8 relative z-40">
      <div className="max-w-5xl mx-auto">
        <Link
  href="/#projects"
  className="group flex w-fit cursor-pointer items-center gap-3 text-body-text transition-colors duration-300 ease-out hover:text-primary"
>
  {isRTL ? (
    <FaArrowRightLong className="transition-all duration-300 ease-out group-hover:translate-x-1" />
  ) : (
    <FaArrowLeftLong className="transition-all duration-300 ease-out group-hover:-translate-x-1" />
  )}

  <span>{t("back")}</span>
</Link>
      </div>

      <div className="flex gap-3 sm:gap-0 flex-col sm:flex-row sm:justify-between sm:items-center max-w-3xl mt-21 w-full mx-auto">
        <h1 className="font-anton tracking-wider text-2xl sm:text-4xl text-foreground">
          {translatedProject.name}
        </h1>

        <div className="flex items-center gap-4 text-sm text-body-text sm:text-base lg:text-lg">
  {project.website ? (
    <a
      href={project.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 transition-all duration-300 ease-out hover:text-primary"
    >
      {t("site")}
      <ArrowUpRight
        className={`h-4 w-4 transition-all duration-300 ease-out group-hover:text-primary ${
          isRTL
            ? "rotate-[-90deg] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
            : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        }`}
      />
    </a>
  ) : null}

  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-1 transition-all duration-300 ease-out hover:text-primary"
  >
    {t("github")}
    <ArrowUpRight
      className={`h-4 w-4 transition-all duration-300 ease-out group-hover:text-primary ${
        isRTL
          ? "rotate-[-90deg] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
          : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      }`}
    />
  </a>
</div>
      </div>

      <p className="mt-6 text-foreground/70 mx-auto max-w-3xl">
        {translatedProject.description}
      </p>

      <div className="mt-12 -mx-6 md:-mx-8">
        <EmblaCarousel images={project.images} projectName={translatedProject.name} />
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold">{t("description")}</h2>
      </div>

      <p className="mt-6 text-foreground/70 mx-auto max-w-3xl">
        {translatedProject.longDescription}
      </p>

      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold">{t("technologies")}</h2>

        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-foreground/70">
          {project.stack.map((technology, index) => (
            <li key={technology}>
              {technology}
              {index === project.stack.length - 1 ? "." : ","}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold">{t("features")}</h2>

        <ul className="mt-6 space-y-3 text-foreground/70">
          {translatedProject.features.map((feature) => (
            <li key={feature}>• {feature}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold">{t("technicalHighlights")}</h2>

        <ul className="mt-6 space-y-3 text-foreground/70">
          {translatedProject.highlights.map((highlight) => (
            <li key={highlight}>• {highlight}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold">{t("myContribution")}</h2>

        <p className="mt-6 text-foreground/70 mx-auto max-w-3xl">
          {translatedProject.contribution}
        </p>
      </section>
    </main>
  );
}

