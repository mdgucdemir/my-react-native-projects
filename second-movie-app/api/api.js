import axios from "axios";
import { apiKey } from ".";

// endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";

const searchMoviesEndPoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

// dynamic endpoints
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const mediaEndpoint = (media, mediaType, pageNum) => {
  const url = `${apiBaseUrl}/${media}/${mediaType}?api_key=${apiKey}&page=${pageNum}`;

  return url;
};

const trendingEndpoint = (media) => {
  const url = `${apiBaseUrl}/trending/${media}/day?api_key=${apiKey}`;
  return url;
};

const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTrendingMovies = ({ media }) => {
  return apiCall(trendingEndpoint(media));
};

export const fetchMediaEndpoint = ({ media, mediaType, pageNum }) => {
  return apiCall(mediaEndpoint(media, mediaType, pageNum));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndPoint, params);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};
