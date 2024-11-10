import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoStreamComponent } from './components/photo-stream/photo-stream.component';
import { FavoriteComponent } from './components/favorites/favorites.component';
import { SinglePhotoComponent } from './components/single-photo/single-photo.component';

const routes: Routes = [
  { path: '', component: PhotoStreamComponent },
  { path: 'favorites', component: FavoriteComponent },
  { path: 'photos/:id', component: SinglePhotoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
