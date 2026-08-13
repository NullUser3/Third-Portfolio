"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { useLocale } from "next-intl";

interface ProjectImage {
  src: string;
  alt: string;
}

interface ProjectCarouselProps {
  images: ProjectImage[];
  projectName?: string;
}

export default function ProjectCarousel({
  images,
  projectName = "Project",
}: ProjectCarouselProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    direction: isRTL ? "rtl" : "ltr",
  });

  const scrollPrev = useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi]
  );

  return (
    <div className="group relative w-full">
      <div
        ref={emblaRef}
        dir={isRTL ? "rtl" : "ltr"}
        className="overflow-hidden"
      >
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={image.src}
              className="relative min-w-0 flex-[0_0_80%] px-2 md:flex-[0_0_70%]"
            >
              <div className="relative aspect-[8/5] w-full overflow-hidden bg-[var(--background)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 70vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-[7%] lg:flex">
        <button
          onClick={scrollPrev}
          aria-label="Previous image"
          className="pointer-events-auto z-10 flex h-9 w-9 items-center justify-center bg-[var(--background)]/70 text-[var(--foreground)] opacity-0 backdrop-blur transition hover:text-[var(--primary-color)] group-hover:opacity-100"
        >
          {isRTL ? (
            <FaArrowRight size={16} />
          ) : (
            <FaArrowLeftLong size={16} />
          )}
        </button>

        <button
          onClick={scrollNext}
          aria-label="Next image"
          className="pointer-events-auto z-10 flex h-9 w-9 items-center justify-center bg-[var(--background)]/70 text-[var(--foreground)] opacity-0 backdrop-blur transition hover:text-[var(--primary-color)] group-hover:opacity-100"
        >
          {isRTL ? (
            <FaArrowLeftLong size={16} />
          ) : (
            <FaArrowRight size={16} />
          )}
        </button>
      </div>
    </div>
  );
}