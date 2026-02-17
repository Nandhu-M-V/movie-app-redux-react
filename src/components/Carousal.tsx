import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface Media {
  id: number;
  title?: string;
  overview?: string;
  name?: string;
  backdrop_path?: string | null;
}

interface CarousalProps {
  movies: Media[];
}

export default function Carousal({ movies }: CarousalProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id}>
            <div className="relative h-195 w-full overflow-hidden">
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : ''
                }
                className="w-full h-full object-cover"
                alt={movie.title || movie.name}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

              <div className="absolute bottom-40 max-w-300 left-10 text-white">
                <h2 className="text-8xl cursor-default  text-gray-200 font-bold">
                  {movie.title || movie.name}
                </h2>
              </div>
              <div className="absolute bottom-15 max-w-200 left-10 text-white">
                <h2 className="pl-2 cursor-default  text-md text-white">
                  {movie.overview?.slice(0, 400) + '...'}
                </h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
