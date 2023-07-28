import { useEffect, useState } from 'react';

interface Movie {
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
  }, []);

  const moviesWithTrailers = movies.map((movie) => ({
    ...movie,
    videos: movie.videos?.filter((video) => video.type === "Trailer") || [],
  }));

  return (
    <div>
      <h1 className='bg-black text-white'>Recommended Movies</h1>
      <ul>
        {moviesWithTrailers.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Duration: {movie.duration} minutes</p>
            {movie.videos.length > 0 && (
              <div>
                <p>{movie.videos[0]?.name}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${movie.videos[0]?.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Assistir ao Trailer
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

