import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OmdbapiService } from '../omdbapi.service';
import { OmdbapiMovie } from '../models/omdbapi.movie.model';
import { Cache } from '../cache/local-storage';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less']
})
export class VideoComponent implements OnInit {
  video: OmdbapiMovie;

  loaded: Boolean = false;
  error: String;

  // MatProgressBar
  fetching: Boolean = false;
  fetchingProgress: Number = 0;
  fetchingError: Object;

  constructor(private omdbapiService: OmdbapiService,
              private router: Router,
              private cache: Cache,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getVideo();
  }

  getVideo(): void {
    this.fetching = true;
    const id = this.route.snapshot.paramMap.get('id');

    const key = JSON.stringify(id);
    const cached = this.cache.get(key);
    if (cached !== null) {
      return this.onGetVideoSuccess(cached as OmdbapiMovie);
    }

    this.omdbapiService
      .findOneByImdbId(id)
      .subscribe(
        this.onGetVideoSuccess.bind(this),
        this.onGetVideoError.bind(this)
      );
  }

  private onGetVideoSuccess(movie: OmdbapiMovie): void {
    const id = this.route.snapshot.paramMap.get('id');
    const key = JSON.stringify([id]);
    this.cache.set(key, movie, 3600);

    this.video = movie;

    this.fetchingProgress = 100;
    setTimeout(() => {
      this.loaded = true;
      this.fetching = false;
    }, 250);
  }

  private onGetVideoError(error: HttpErrorResponse): void {
    this.fetching = false;
    this.fetchingProgress = 0;

    // this.movieSearch = new OmdbapiMovieSearch();
    this.error = error.toString();
  }
}
