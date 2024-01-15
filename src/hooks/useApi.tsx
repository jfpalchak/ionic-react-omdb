const useApi = () => {

  const URL = 'http://www.omdbapi.com/';
  const API_KEY = import.meta.env.VITE_API_KEY;

  const searchData = async (title: string, type: SearchType): Promise<SearchResponse> => {
    const result = await fetch(
      `${URL}?s=${encodeURI(title)}&type=${type}&apikey=${API_KEY}`,
    );

    return result.json();
  };

  const getDetails = async (id: string): Promise<DetailsResult> => {
    const result = await fetch(`${URL}?i=${id}&plot=full&apikey=${API_KEY}`);
    
    return result.json();
  }

  return {
    searchData,
    getDetails,
  };
}

export default useApi;

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode',
  game = 'game'
}

type Rating = {
  Source: string;
  Value: string;
}
export interface DetailsResult {
  Awards: string;
  Genre: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  Director: string;
  Actors: string;
  Website: string;
  Response: string;
  Error?: string;
  Ratings: Rating[];
  Rated: string;
}

export interface SearchResult {
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbID: string;
}

export interface SearchResponse {
  Response: string;
  totalResults: number;
  Search: SearchResult[];
  Error?: string;
}