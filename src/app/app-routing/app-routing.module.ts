import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideosComponent } from '../videos/videos.component';
import { VideoComponent } from '../video/video.component';

const routes: Routes = [
  { path: '', component: VideosComponent },
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

