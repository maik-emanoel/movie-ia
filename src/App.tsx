import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Card } from "./components/Card";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  duration: number;
  videos?: { key: string; name: string; type: string }[];
}

export function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const moviesPerPage = 3;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuspense, setIsSuspense] = useState(true);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
        );
        const data = await response.json();
        const results: Movie[] = data.results;

        const moviesWithDetails = await Promise.all(
          results.map(async (movie) => {
            const detailsResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
            );
            const detailsData = await detailsResponse.json();

            const movieWithDuration: Movie = {
              ...movie,
              duration: detailsData.runtime,
              videos: detailsData.videos?.results,
            };
            return movieWithDuration;
          })
        );

        setMovies(moviesWithDetails);
        setIsSuspense(false);
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

  function handleNextMovies() {
    setIsLoading(true);
    setTimeout(() => {
      if (currentPage * moviesPerPage < moviesWithTrailers.length) {
        setCurrentPage((prevState) => prevState + 1);
      } else {
        setCurrentPage(1);
      }

      setIsLoading(false);
    }, 1700);
  }

  return (
    <main className="bg-borderGradient w-[90%] max-w-[846px] p-1 rounded-2xl shadow-main mx-auto my-8 overflow-x-hidden sm:bg-none sm:shadow-none sm:w-full sm:h-full sm:p-0 sm:rounded-none">
      <div className="py-16 bg-darkGray rounded-xl px-6 sm:rounded-none sm:h-full">
        <div className="max-w-[654px] w-full h-full mx-auto flex flex-col gap-8">
          <Header handleNextMovies={handleNextMovies} isLoading={isLoading} />

          <div className="flex items-center gap-9 flex-wrap h-[424px] md:h-auto md:grid md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:justify-items-center sm:grid-cols-2">
            {isSuspense ? (
              <div className="text-slate-100 mx-auto text-xl font-medium animate-pulse">
                Carregando...
              </div>
            ) : (
              <>
                {moviesWithTrailers
                  .slice(
                    (currentPage - 1) * moviesPerPage,
                    currentPage * moviesPerPage
                  )
                  .map((movie: Movie) => {
                    return <Card movie={movie} key={movie.id} />;
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
