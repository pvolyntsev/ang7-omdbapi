import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OmdbapiService } from '../omdbapi.service';
import { OmdbapiMovie } from '../models/omdbapi.movie.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
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
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getVideo();
  }

  getVideo(): void {
    this.fetching = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.omdbapiService
      .findOneByImdbId(id)
      .subscribe(
        this.onGetVideoSuccess.bind(this),
        this.onGetVideoError.bind(this)
      );
  }

  private onGetVideoSuccess(movie: OmdbapiMovie): void {
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
