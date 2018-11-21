import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideosComponent } from '../videos/videos.component';
import { VideoComponent } from '../video/video.component';
import { ChosenVideosComponent } from '../chosen-videos/chosen-videos.component';

const routes: Routes = [
  { path: '', component: VideosComponent },
  { path: 'chosen', component: ChosenVideosComponent },
  { path: 'view/:id', component: VideoComponent },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ]
})
export class AppRoutingModule { }

