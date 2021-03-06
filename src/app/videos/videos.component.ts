import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieSearchFilter } from '../models/movie-search-filter.model';
import { OmdbapiService } from '../omdbapi.service';
import { OmdbapiMovieSearch } from '../models/omdbapi.movie-search.model';
import { OmdbapiMovie } from '../models/omdbapi.movie.model';
import { Pagination } from '../models/pagination.model';
import { Cache } from '../cache/local-storage';
import { ChosenVideosService } from '../chosen-videos/chosen-videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.less']
})
export class VideosComponent implements OnInit {
  searchFilter: MovieSearchFilter = new MovieSearchFilter();
  movieSearch: OmdbapiMovieSearch = new OmdbapiMovieSearch();
  pagination: Pagination = new Pagination();
  videosList: OmdbapiMovie[];
  loaded: Boolean = false;

  // MatProgressBar
  fetching: Boolean = false;
  fetchingProgress: Number = 0;

  constructor(private omdbapiService: OmdbapiService,
              private chosen: ChosenVideosService,
              private cache: Cache,
              private router: Router) { }

  ngOnInit() {
    const movie = this.cache.get('searchFilter:movie');
    const pageIndex = this.cache.get('pagination:pageIndex');

    if (movie !== null && pageIndex !== null) {
      this.pagination.pageIndex = parseInt(pageIndex as string, 10);
      this.searchFilter.movie = movie.toString();
      this.onSearchFormSubmit();
    }
  }

  onPageChange(event: PageEvent) {
    this.pagination.pageIndex = event.pageIndex;
    this.onSearchFormSubmit();
  }

  onSearchFormSubmit(): void {
    if (this.searchFilter.movie.length > 0) {
      this.searchVideos();
    }
  }

  private searchVideos(): void {
    this.fetching = true;
    this.fetchingProgress = 25;

    const key = JSON.stringify([this.searchFilter, this.pagination]);
    const cached = this.cache.get(key);
    if (cached !== null) {
      return this.onSearchVideosSuccess(cached as OmdbapiMovieSearch);
    }

    this.omdbapiService
      .findAll(this.searchFilter, this.pagination)
      .subscribe(
        this.onSearchVideosSuccess.bind(this),
        this.onSearchVideosError.bind(this)
      );
  }

  private onSearchVideosSuccess(movieSearch: OmdbapiMovieSearch): void {
    const key = JSON.stringify([this.searchFilter, this.pagination]);
    this.cache.set(key, movieSearch, 3600);
    this.cache.set('searchFilter:movie', this.searchFilter.movie);
    this.cache.set('pagination:pageIndex', this.pagination.pageIndex);

    this.movieSearch = movieSearch;
    this.videosList = this.movieSearch.Search;
    this.pagination.length = this.movieSearch.totalResults;

    this.fetchingProgress = 100;
    setTimeout(() => {
      this.loaded = true;
      this.fetching = false;
    }, 250);
  }

  private onSearchVideosError(error: HttpErrorResponse): void {
    this.fetching = false;
    this.fetchingProgress = 0;

    this.movieSearch = new OmdbapiMovieSearch();
    this.movieSearch.Error = error.toString();
  }

  goChosen(): void {
    this.router.navigateByUrl('/chosen');
  }

  goVideoDetails(movie: OmdbapiMovie): void {
    this.router.navigateByUrl('/view/' + movie.imdbID);
  }

  isChosen(movie: OmdbapiMovie): Boolean {
    return this.chosen.has(movie);
  }

  addToChosen(movie: OmdbapiMovie): void {
    this.chosen.add(movie);
  }

  removeFromChosen(movie: OmdbapiMovie): void {
    this.chosen.remove(movie);
  }
}
