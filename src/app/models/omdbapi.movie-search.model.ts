import { OmdbapiMovie } from './omdbapi.movie.model';

export class OmdbapiMovieSearch {
  public Search: OmdbapiMovie[] = [];
  public Response = false;
  public totalResults = 0;
  public Error = '';
}
