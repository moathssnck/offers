"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { X, Play, Pause, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface OfferSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
}

interface FullPageCarouselProps {
  slides: OfferSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onClose?: () => void;
  className?: string;
  isRTL?: boolean;
}

export function FullPageCarousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  onClose,
  className,
  isRTL = false,
}: FullPageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(autoPlay);
  const intervalRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  React.useEffect(() => {
    if (!api || !isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, isPlaying, autoPlayInterval]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={cn("fixed inset-0 z-50 bg-black", className)}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayPause}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </button>
            <div className="text-white/80 text-sm font-medium">
              {current} / {count}
            </div>
          </div>
        </div>
      </div>

      {/* Main Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative h-screen w-screen overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out scale-110 hover:scale-105"
                  style={{
                    backgroundImage: `url(${slide.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                <div
                  className={cn(
                    "absolute inset-0",
                    isRTL
                      ? "bg-gradient-to-l from-black/60 via-transparent to-transparent"
                      : "bg-gradient-to-r from-black/60 via-transparent to-transparent"
                  )}
                />

                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-8 lg:px-12 max-w-7xl">
                    <div
                      className={cn(
                        "max-w-2xl space-y-6",
                        isRTL ? "mr-auto text-right" : "text-left"
                      )}
                    >
                      {slide.badge && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {slide.badge}
                          </span>
                        </div>
                      )}

                      <h1
                        className={cn(
                          "text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight",
                          "bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent",
                          isRTL && "font-arabic"
                        )}
                      >
                        {slide.title}
                      </h1>

                      <p
                        className={cn(
                          "text-md lg:text-2xl text-white/80 leading-relaxed max-w-xl",
                          isRTL && "font-arabic"
                        )}
                      >
                        {slide.description}
                      </p>

                      <div className="pt-4 flex justify-center">
                        <Button
                          size="lg"
                          className="group bg-white text-black hover:bg-white/90 px-3 py-2 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
                          asChild
                        >
                          <Link
                            href={slide.ctaLink}
                            className="flex items-center gap-3"
                          >
                            {" "}
                            {slide.ctaText}
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 text-white/60 text-sm font-mono">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className={cn(
            "w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110",
            isRTL ? "right-8" : "left-8"
          )}
        />
        <CarouselNext
          className={cn(
            "w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110",
            isRTL ? "left-8" : "right-8"
          )}
        />
      </Carousel>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "relative overflow-hidden rounded-full transition-all duration-300",
              current === index + 1
                ? "w-12 h-3 bg-white"
                : "w-3 h-3 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          >
            {current === index + 1 && isPlaying && (
              <div
                className="absolute inset-0 bg-white/60 origin-left animate-pulse"
                style={{
                  animation: `slideProgress ${autoPlayInterval}ms linear infinite`,
                }}
              />
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideProgress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
