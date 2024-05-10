'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Children, useEffect, useState } from 'react';

type CarouselProps = {
  children: React.ReactNode;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  containsCards?: boolean;
};

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  containsCards = false,
}: CarouselProps) => {
  const [curr, setCurr] = useState(0);

  const next = () =>
    setCurr((curr) => (curr === Children.count(slides) - 1 ? 0 : curr + 1));

  const prev = () =>
    setCurr((curr) => (curr === 0 ? Children.count(slides) - 1 : curr - 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  });

  return (
    <div className="relative">
      <div className="overflow-hidden relative z-10">
        <div
          className={`flex transition-transform ease-out duration-500 ${!containsCards && 'md:h-[700px]'}`}
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides}
        </div>
        {!containsCards && (
          <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
              {Children.map(slides, (s, i) => (
                <div
                  key={i}
                  className={`transition-all w-1.5 h-1.5 bg-primary-dark rounded-full  ${
                    curr === i ? 'p-0.5' : 'bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {containsCards && (
        <div className="absolute z-10 -ms-[1.6rem] w-[calc(100%+3.2rem)] top-[calc(50%-0.5rem)] -mt-4 flex justify-between">
          <button
            className="bg-light text-dark-gray border border-gray-light rounded-full flex items-center justify-center h-9 w-9"
            onClick={prev}
          >
            <ChevronLeft />
          </button>
          <button
            className="bg-light text-dark-gray border border-gray-light rounded-full flex items-center justify-center h-9 w-9"
            onClick={next}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
