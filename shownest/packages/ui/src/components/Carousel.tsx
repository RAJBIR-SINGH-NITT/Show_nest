import * as React from 'react'
import { Button } from './Button'

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  autoPlay?: boolean
  interval?: number
  showIndicators?: boolean
  showArrows?: boolean
  className?: string
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ children, autoPlay = false, interval = 5000, showIndicators = true, showArrows = true, className = '', ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const childrenArray = React.Children.toArray(children)

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % childrenArray.length)
    }

    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + childrenArray.length) % childrenArray.length)
    }

    React.useEffect(() => {
      if (autoPlay) {
        const timer = setInterval(nextSlide, interval)
        return () => clearInterval(timer)
      }
    }, [autoPlay, interval])

    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
        {/* Slides */}
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {childrenArray.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && childrenArray.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full p-2"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full p-2"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && childrenArray.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {childrenArray.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

Carousel.displayName = 'Carousel'
