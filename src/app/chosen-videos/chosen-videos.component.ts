import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { OmdbapiMovie } from '../models/omdbapi.movie.model';
import { Pagination } from '../models/pagination.model';
import { ChosenVideosService } from './chosen-videos.service';

@Component({
  selector: 'app-chosen-videos',
  templateUrl: './chosen-videos.component.html',
  styleUrls: ['./chosen-videos.component.less']
})
export class ChosenVideosComponent implements OnInit {
  pagination: Pagination = new Pagination();

  constructor(private chosen: ChosenVideosService,
              private router: Router) { }

  public get videosList(): OmdbapiMovie[] {
    const start = this.pagination.pageIndex * this.pagination.pageSize;
    const end = (1 + this.pagination.pageIndex) * this.pagination.pageSize;
    return this.chosen.movieList.slice(start, end);
  }

  public get paginationLength(): number {
    return this.chosen.movieList.length;
  }

  ngOnInit() {
  }

  onPageChange(event: PageEvent) {
    this.pagination.pageIndex = event.pageIndex;
  }
}
