import { CalendarBlank, Clock, Star } from "@phosphor-icons/react";
import play from "../assets/play.svg";
import { Movie } from "../App";

interface CardProps {
  movie: Movie;
}

export function Card({ movie }: CardProps) {
  function formatDuration(durationInMinutes: number) {
    const hours = Math.floor(durationInMinutes / 60)
    const minutes = durationInMinutes % 60

    return `${hours}h${minutes}min`
  }

  return (
    <div className="w-[194px] flex flex-col animate-bounceIn md:w-[95%] md:h-full">
      <header className="flex items-center justify-between gap-1 h-10">
        <span className="text-white text-xl leading-5 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
          {movie.title}
        </span>
        <div className="flex items-center gap-1 text-[#FEEA35] font-semibold">
          <Star color="#FEEA35" weight="fill" className="drop-shadow-star" />
          <span>{movie.vote_average}</span>
        </div>
      </header>

      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="h-72 rounded-lg mt-4 object-cover md:h-full md:max-h-[300px]"
      />

      <div className="mt-2 text-lightGray flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Clock size={20} />
          <span className="text-xs">{formatDuration(movie.duration)}</span>
        </div>

        <div className="flex items-center gap-1">
          <CalendarBlank size={20} />
          <span className="text-xs">{(movie.release_date).slice(0, 4)}</span>
        </div>
      </div>

      {movie.videos && (
        <a
          href={`https://www.youtube.com/watch?v=${movie.videos[0]?.key}`}
          target="_blank"
          className="mt-2 flex items-center justify-center gap-2 bg-normalGray h-11 text-white leading-5 rounded transition-all duration-300 hover:bg-mediumGray flex-shrink-0"
        >
          <img src={play} alt="Ícone de play" className="sm:w-6"/>
          <span className="md:text-sm">Assistir trailer</span>
        </a>
      )}
    </div>
  );
}
