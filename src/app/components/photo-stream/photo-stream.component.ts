import { Component, HostListener } from '@angular/core';
import { PhotoService } from 'src/app/services/services/photo.service';
import { Router } from '@angular/router';
import { FavoriteService } from 'src/app/services/services/favorite.service';

@Component({
  selector: 'app-photo-stream',
  templateUrl: './photo-stream.component.html',
  styleUrls: ['./photo-stream.component.scss'],
})
export class PhotoStreamComponent {
  photos: Blob[] = [];
  loading: boolean = false;

  constructor(private photoService: PhotoService, private router: Router, private favoriteService: FavoriteService) {
    this.loadMorePhotos();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !this.loading) {
      this.loadMorePhotos();
    }
  }

  loadMorePhotos(): void {
    this.loading = true;
    this.photoService.getRandomPhotos().subscribe((newPhotos: Blob[]) => {
      this.photos = [...this.photos, ...newPhotos];
      this.loading = false;
    });
  }

  addToFavorites(photo: Blob): void {
    this.favoriteService.addToFavorites(photo); // Pass Blob directly
    this.router.navigate(['/favorites']); // Navigate to the favorites page
  }
}

