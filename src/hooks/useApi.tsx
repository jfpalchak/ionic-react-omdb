export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode',
}

export interface DetailsResult {
  Genre: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  Director: string;
  Actors: string;
  Website: string;
}


const useApi = () => {

  const URL = 'https://www.omdbapi.com/';
  const API_KEY = import.meta.env.VITE_API_KEY;

  const searchData = async (title: string, type: SearchType): Promise<any> => {
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