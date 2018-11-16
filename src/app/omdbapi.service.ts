import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';

import { OmdbapiMovieSearch } from './models/omdbapi.movie-search.model';
import { MovieSearchFilter } from './models/movie-search-filter.model';
import { Pagination } from './models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class OmdbapiService {

  endpoint = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) { }

  search(filter: MovieSearchFilter, pagination: Pagination): Observable<OmdbapiMovieSearch> {
    const page = pagination.pageIndex;
    const options = { ...filter, page };
    const params = new HttpParams();
    Object.keys(options).forEach((param, index) => params.set(param, options[param]));
    return this.http.get<OmdbapiMovieSearch>(this.endpoint, { params });
  }
}
