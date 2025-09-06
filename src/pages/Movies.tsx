// src/pages/Movies.tsx
import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";

import { fetchMovies, fetchPopularMovies } from "../services/movieService";
import type { Movie } from "../types/movie";
import styles from "../components/App/App.module.css";

import SearchBar from "../components/SearchBar/SearchBar";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import MovieModal from "../components/MovieModal/MovieModal";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";

export default function MoviesPage() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);

  function toggleModal() {
    setIsOpen((prev) => !prev);
    if (isOpen && movie) setMovie(null);
  }

  function onSelect(params: Movie) {
    setMovie(params);
    toggleModal();
  }

  const handleSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", search, page],
    queryFn: () => (search ? fetchMovies(search, page) : fetchPopularMovies(page)),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && (!data || data.results.length === 0)) {
      toast.error("No movies found.");
    }
  }, [data, isSuccess]);

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={styles.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {data && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={onSelect} />
      )}
      {isOpen && movie && <MovieModal onClose={toggleModal} movie={movie} />}
    </div>
  );
}
