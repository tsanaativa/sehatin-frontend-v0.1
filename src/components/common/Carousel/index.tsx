'use client';
import { Children, useEffect, useState } from 'react';

type CarouselProps = {
  children: React.ReactNode;
  autoSlide?: boolean;
  autoSlideInterval?: number;
};

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}: CarouselProps) => {
  const [curr, setCurr] = useState(0);

  const next = () =>
    setCurr((curr) => (curr === Children.count(slides) - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  });

  return (
    <div className="overflow-hidden relative -z-10">
      <div
        className="flex transition-transform ease-out duration-500 md:h-[700px]"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
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
    </div>
  );
};

export default Carousel;
