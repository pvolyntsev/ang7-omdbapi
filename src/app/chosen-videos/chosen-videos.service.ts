import { Injectable } from '@angular/core';
import { Cache } from '../cache/local-storage';
import { OmdbapiMovie } from '../models/omdbapi.movie.model';

@Injectable()
export class ChosenVideosService {
  movieList: OmdbapiMovie[] = [];

  constructor(private cache: Cache) {
    const movieList = this.cache.get('ChosenVideosService:movieList');
    if (movieList !== null) {
      this.movieList = (movieList as OmdbapiMovie[]);
    }
  }

  has(movie: OmdbapiMovie): Boolean {
    const found = this.movieList.find((m: OmdbapiMovie) => {
      return m.imdbID === movie.imdbID;
    });
    return found !== undefined;
  }

  add(movie: OmdbapiMovie): void {
    if (!this.has(movie)) {
      this.movieList.push(movie);
      this.cache.set('ChosenVideosService:movieList', this.movieList);
    }
  }

  remove(movie: OmdbapiMovie): void {
    if (this.has(movie)) {
      this.movieList = this.movieList.filter(m => m.imdbID !== movie.imdbID);
      this.cache.set('ChosenVideosService:movieList', this.movieList);
    }
  }
}
