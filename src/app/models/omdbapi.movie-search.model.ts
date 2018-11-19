import { OmdbapiMovie } from './omdbapi.movie.model';

export class OmdbapiMovieSearch {
  public Search: OmdbapiMovie[] = [];
  public Response: Boolean = false;
  public totalResults: Number = 0;
  public Error: String = '';
}
