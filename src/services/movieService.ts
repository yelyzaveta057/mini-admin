// movieService.ts
import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = import.meta.env.VITE_API_URL || "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;



const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    Accept: "application/json",
  },
});

export interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchPopularMovies = async (page = 1) => {
  const { data } = await api.get<MoviesHttpResponse>("/movie/popular", {
    params: { page },
  });
  return data;
};

export const fetchMovies = async (query: string, page = 1) => {
  const { data } = await api.get<MoviesHttpResponse>("/search/movie", {
    params: { query, language: "en-US", include_adult: false, page },
  });
  return data;
};
