import { Component } from '@angular/core';
import { MovieSearchFilter } from './models/movie-search-filter.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ang5-omdbapi';
  showSearch = false;
  search = new MovieSearchFilter();
}
