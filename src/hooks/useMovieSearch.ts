import { useEffect, useState } from "react";
import { KEY } from "../constants";

const movieCache = new Map();
export default function useMovieSearch(query: string, pageNumber: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setMovies([]);    
  }, [query]);

  useEffect(() => {
    if (query) {
    
      if (pageNumber === "1" && movieCache.has(query)) {
        setMovies(movieCache.get(query));
      } else {
        setLoading(true);
        setError(false);
        fetch(
          `https://www.omdbapi.com/?s=${query}&page=${pageNumber}&apikey=${KEY}`
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.Response === "True") {
              if (!movieCache.has(query)) {
                movieCache.set(query, res.Search);
              }
              setMovies((prev: any) => {
                return [...prev, ...res.Search];
              });
              setHasMore(
                Math.ceil(Number(res.totalResults) / 10) > Number(pageNumber)
              );
            } else if (res.Response === "False") {
              setError(true);
              setErrMsg(res.Error);
            }
          })
          .catch((e) => {
            setError(true);
            setErrMsg(e);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [query, pageNumber]);

  return { loading, error, errMsg, movies, hasMore };
}
