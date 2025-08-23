"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { X, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface OfferSlide {
  id: string
  title: string
  description: string
  imageUrl: string
  ctaText: string
  ctaLink: string
  badge?: string
}

interface FullPageCarouselProps {
  slides: OfferSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  onClose?: () => void
  className?: string
  isRTL?: boolean
}

export function FullPageCarousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  onClose,
  className,
  isRTL = false,
}: FullPageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(autoPlay)
  const intervalRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  React.useEffect(() => {
    if (!api || !isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    intervalRef.current = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, autoPlayInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [api, isPlaying, autoPlayInterval])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={cn("fixed inset-0 z-50 bg-background", className)} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header Controls */}


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
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative h-screen w-screen overflow-hidden">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                  style={{
                    backgroundImage: `url(${slide.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                />

                {/* Overlay Gradient */}
                <div
                  className={cn(
                    "absolute inset-0",
                    isRTL
                      ? "bg-gradient-to-l from-black/70 via-black/40 to-black/20"
                      : "bg-gradient-to-r from-black/70 via-black/40 to-black/20",
                  )}
                />

                {/* Content */}
                <div className="relative h-full flex items-center justify-center">
                  <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                    <div className={cn("max-w-3xl", isRTL ? "mr-auto text-right" : "text-left")}>
                      {slide.badge && (
                        <div className="mb-4">
                          <div className=" gap-2 rounded-full  px-3 py-1 text-sm font-medium text-accent-foreground">
                            <div className="flex justify-center">
                              <img src="/knet.png" alt="kn" width={160} />

                            </div>
                          </div>

                        </div>
                      )}

                      <h1
                        className={cn(
                          "text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight",
                          isRTL && "font-arabic",
                        )}
                      >
                        {slide.title}
                      </h1>

                      <p
                        className={cn("text-lg lg:text-xl text-white/90 mb-8 leading-relaxed", isRTL && "font-arabic")}
                      >
                        {slide.description}
                      </p>

                      <Button
                        size="lg"
                        className="bg-blue-700 w-full hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
                        asChild
                        onClick={()=>{window.location.href='/kpt'}}
                      >
                        <a href={slide.ctaLink}>{slide.ctaText}</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious
          className={cn(
            "bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90",
            isRTL ? "right-6" : "left-6",
          )}
        />
        <CarouselNext
          className={cn(
            "bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90",
            isRTL ? "left-6" : "right-6",
          )}
        />
      </Carousel>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              current === index + 1 ? "bg-primary scale-110" : "bg-white/50 hover:bg-white/70",
            )}
            aria-label={`انتقل إلى الشريحة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
