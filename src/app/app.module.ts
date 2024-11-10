import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';
import { PhotoStreamComponent } from './components/photo-stream/photo-stream.component';
import { FavoriteComponent } from './components/favorites/favorites.component';
import { SinglePhotoComponent } from './components/single-photo/single-photo.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    PhotoStreamComponent,
    FavoriteComponent,
    SinglePhotoComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
