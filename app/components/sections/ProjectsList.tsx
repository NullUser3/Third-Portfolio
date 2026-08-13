// src/components/ProjectList.tsx
"use client";

import { content } from "../hooks/content";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { isRtlLocale } from "@/lib/rtl"; // adjust path if needed

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProjectList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const t = useTranslations("projects");
  const locale = useLocale();
  const isRTL = isRtlLocale(locale);

  const [selectedProject, setSelectedProject] = useState<number>(
    content.projects[0].id
  );

  const getProjectKey = (slug: string) => {
    if (slug === "realtime-chat-app") return "realtimeChatApp";
    if (slug === "expense-tracker") return "expenseTracker";
    return "todoApp";
  };

  const translatedProjects = content.projects.map((project) => ({
    ...project,
    name: t(`${getProjectKey(project.slug)}.name`),
    desc: t.rich(`${getProjectKey(project.slug)}.description`, {
      name: (chunks) => (
        <span className="text-foreground">{chunks}</span>
      ),
    }),
  }));

  // Floating image (desktop only)
  useGSAP(
    (context, contextSafe) => {
      if (window.innerWidth < 768) return;

      const container = containerRef.current;
      const image = imageContainer.current;

      if (!container || !image) return;

      const moveImage = contextSafe!((e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();

        gsap.to(image, {
          y: e.clientY - rect.top - imageRect.height / 2,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      });

      const hideImage = contextSafe!(() => {
        gsap.to(image, {
          opacity: 0,
          duration: 0.2,
          overwrite: "auto",
        });
      });

      container.addEventListener("mousemove", moveImage);
      container.addEventListener("mouseleave", hideImage);

      return () => {
        container.removeEventListener("mousemove", moveImage);
        container.removeEventListener("mouseleave", hideImage);
      };
    },
    { scope: containerRef }
  );

  // Slide-up-and-fade reveal on scroll
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top 80%",
          toggleActions: "restart none none reverse",
          scrub: 1,
        },
      });

      tl.from(containerRef.current, {
        y: 150,
        opacity: 0,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      className="pb-section w-full font-space max-w-6xl mx-auto px-6 py-8 md:px-8 relative z-40"
    >
      <div ref={containerRef} >
        <div className="slide-up-and-fade">
          <h2 className="mt-12 font-medium max-w-6xl text-body-text w-full">
            {t("title")}
          </h2>

          <div className="h-px max-w-6xl w-full bg-body-text mt-2" />
        </div>

        <div className="relative group/projects">
          {/* Floating desktop image */}
          <div
            ref={imageContainer}
            className={cn(
              "absolute top-0 hidden lg:block",
              "w-[350px] xl:w-[450px]",
              "aspect-[16/9]",
              "overflow-hidden",
              "opacity-0",
              "pointer-events-none",
              "z-10",
              isRTL ? "left-0" : "right-0"
            )}
          >
            {content.projects.map((project) => (
              <Image
                key={project.id}
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                sizes="(min-width: 1280px) 450px, 350px"
                className={cn(
                  "absolute inset-0 object-cover object-top transition-opacity duration-500",
                  selectedProject === project.id
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
            ))}
          </div>

          <div className="flex flex-col">
            {translatedProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                onMouseEnter={() => {
                  if (window.innerWidth >= 768) {
                    setSelectedProject(project.id);
                  }
                }}
                className="
                  group
                  cursor-pointer
                  border-b
                  border-border
                  py-8
                  transition-all
                  duration-300
                  md:group-hover/projects:opacity-30
                  md:hover:!opacity-100
                "
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="w-full">
                    {/* Mobile Image */}
                    <div className="relative mt-8 aspect-video overflow-hidden mb-6 lg:hidden">
                      <Image
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        fill
                        sizes="100vw"
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex gap-4 items-start">
                      <span className="text-muted-foreground font-medium font-anton">
                        {(index + 1).toString().padStart(2, "0")}.
                      </span>

                      <h3
                        className={cn(
                          "text-2xl sm:text-3xl md:text-4xl tracking-wide font-anton",
                          "from-primary to-foreground from-[50%] to-[50%]",
                          "bg-[length:200%] bg-clip-text text-transparent",
                          "transition-all duration-700 ease-out",
                          isRTL
                            ? "bg-gradient-to-l bg-left group-hover:bg-right"
                            : "bg-gradient-to-r bg-right group-hover:bg-left"
                        )}
                      >
                        {project.name}
                      </h3>

                      {isRTL ? (
  <ArrowUpLeft
    className="
      h-6
      w-6
      text-body-text
      opacity-0
      [clip-path:inset(100%_0_0_100%)]
      transition-[opacity,clip-path]
      duration-300
      ease-out
      group-hover:opacity-100
      group-hover:[clip-path:inset(0_0_0_0)]
    "
  />
) : (
  <ArrowUpRight
    className="
      h-6
      w-6
      text-body-text
      opacity-0
      [clip-path:inset(100%_100%_0_0)]
      transition-[opacity,clip-path]
      duration-300
      ease-out
      group-hover:opacity-100
      group-hover:[clip-path:inset(0_0_0_0)]
    "
  />
)}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3 text-sm text-foreground/70">
                      {project.stack.map((tech, idx) => (
                        <div
                          key={tech}
                          className="flex items-center gap-3"
                        >
                          <span>{tech}</span>

                          {idx !== project.stack.length - 1 && (
                            <span className="size-1.5 rounded-full bg-body-text/50" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}