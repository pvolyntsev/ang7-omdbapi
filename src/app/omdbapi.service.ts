import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OmdbapiMovieSearch } from './models/omdbapi.movie-search.model';
import { OmdbapiMovie } from './models/omdbapi.movie.model';
import { MovieSearchFilter } from './models/movie-search-filter.model';
import { Pagination } from './models/pagination.model';

@Injectable()
export class OmdbapiService {

  apikey = '';
  endpoint = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) { }

  findAll(filter: MovieSearchFilter, pagination: Pagination): Observable<OmdbapiMovieSearch> {
    const options = {
      apikey: this.apikey,
      type: 'movie',
      s: filter.movie,
      page: 1 + pagination.pageIndex,
    };
    let params = new HttpParams();
    Object.keys(options).forEach((p, i) => {
      params = params.set(p, options[p]);
    });
    return this.http.get<OmdbapiMovieSearch>(this.endpoint, { params });
  }

  findOneByImdbId(id: String): Observable<OmdbapiMovie> {
    const options = {
      apikey: this.apikey,
      type: 'movie',
      i: id,
    };
    let params = new HttpParams();
    Object.keys(options).forEach((p, i) => {
      params = params.set(p, options[p]);
    });
    return this.http.get<OmdbapiMovie>(this.endpoint, { params });
  }
}
