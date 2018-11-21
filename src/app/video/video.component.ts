import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OmdbapiService } from '../omdbapi.service';
import { OmdbapiMovie } from '../models/omdbapi.movie.model';
import { Cache } from '../cache/local-storage';
import { ChosenVideosService } from '../chosen-videos/chosen-videos.service';

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

  constructor(private omdbapiService: OmdbapiService,
              private chosen: ChosenVideosService,
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
    const key = JSON.stringify(id);
    this.cache.set(key, movie, 3600);

    this.video = movie;

    this.fetchingProgress = 100;
    setTimeout(() => {
      this.error = this.video.Error || '';

      this.loaded = !this.video.Error;
      this.fetching = false;
    }, 250);
  }

  private onGetVideoError(error: HttpErrorResponse): void {
    this.fetching = false;
    this.fetchingProgress = 0;

    // this.movieSearch = new OmdbapiMovieSearch();
    this.error = error.toString();
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  goChosen(): void {
    this.router.navigateByUrl('/chosen');
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
