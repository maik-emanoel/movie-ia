import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Card } from './components/Card';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  duration?: number;
  videos?: { key: string; name: string; type: string }[];
}

export function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        const results: Movie[] = data.results;

        const moviesWithDetails = await Promise.all(results.map(async (movie) => {
          const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`);
          const detailsData = await detailsResponse.json();
          
          const movieWithDuration: Movie = {
            ...movie,
            duration: detailsData.runtime,
            videos: detailsData.videos?.results,
          };
          return movieWithDuration;
        }));

        setMovies(moviesWithDetails);
      } catch (error) {
        console.error("Erro ao obter filmes:", error);
      }
    }

    getMovies();
  }, [API_KEY]);

  const moviesWithTrailers = movies.map((movie) => ({
    ...movie,
    videos: movie.videos?.filter((video) => video.type === "Trailer") || [],
  }));

  return (
    <main className='py-16 bg-darkGray shadow-main rounded-2xl border-[6px] border-[#8323FF] w-full max-w-[846px]'>
      <div className='max-w-[654px] w-full mx-auto flex flex-col gap-8'>
        <Header />

        <div className='flex items-center gap-9 flex-wrap'>
          {
            moviesWithTrailers.map((movie: Movie) => {
              return <Card movie={movie} />
            })
          }
        </div>
      </div>
    </main>
  )
}

