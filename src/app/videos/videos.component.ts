import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { MovieSearchFilter } from '../models/movie-search-filter.model';
import { OmdbapiService } from '../omdbapi.service';
import { OmdbapiMovieSearch } from '../models/omdbapi.movie-search.model';
import { OmdbapiMovie } from '../models/omdbapi.movie.model';
import { Pagination } from '../models/pagination.model';
import { HttpErrorResponse } from '@angular/common/http';


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
  fetching: Boolean = false;
  fetchingProgress: Number = 0;
  fetchingError: Object;

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private omdbapiService: OmdbapiService) { }

  ngOnInit() {
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onSearchFormSubmit(): void {
    if (this.searchFilter.movie.length > 0) {
      this.searchVideos();
    }
  }

  private searchVideos(): void {
    this.fetching = true;
    this.fetchingProgress = 25;

    this.omdbapiService
      .search(this.searchFilter, this.pagination)
      .subscribe(
        this.onSearchVideosSuccess.bind(this),
        this.onSearchVideosError.bind(this)
      );
  }

  private onSearchVideosSuccess(movieSearch: OmdbapiMovieSearch): void {
    this.movieSearch = movieSearch;
    this.videosList = this.movieSearch.Search;

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
}
