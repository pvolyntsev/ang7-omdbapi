import { OmdbapiMovie } from './omdbapi.movie.model';

export class OmdbapiMovieSearch {
    search: OmdbapiMovie[];
    response: boolean;
    totalResults: number;
}
