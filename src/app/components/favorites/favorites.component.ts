import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoriteService } from 'src/app/services/services/favorite.service';
import { Subscription } from 'rxjs';
import { PhotoService } from 'src/app/services/services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {
  favoritePhotos: Blob[] = [];
  private subscription!: Subscription;

  constructor(private favoriteService: FavoriteService, private photoService: PhotoService, private router: Router) {}

  ngOnInit(): void {
    // Load initial favorites from localStorage
    const photoUrls = this.favoriteService.getFavorites();
    this.favoritePhotos = photoUrls.map(url => this.dataURLToBlob(url));

    // Subscribe to updates
    this.subscription = this.favoriteService.favoritePhotosUpdated$.subscribe(photoUrls => {
      this.favoritePhotos = photoUrls.map(url => this.dataURLToBlob(url));
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Helper function to convert data URL to Blob
  dataURLToBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }


  getPhotoUrl(photo: Blob): string {
    return URL.createObjectURL(photo);
  }

  // Open the single photo view
  openSinglePhoto(photo: Blob): void {
    const photoUrl = URL.createObjectURL(photo); // Create URL for the Blob
    this.photoService.setSelectedPhotoBlob(photo); // Store the Blob in the service
    const id = photoUrl.split('/').pop(); // Extract the unique ID from the Blob URL

    console.log('Generated Photo URL:', photoUrl);
    console.log('Extracted ID:', id); // Log the ID to confirm

    // Navigate to the single photo page with the ID
    if (id) {
      this.router.navigate([`/photos/${id}`]);
    }
  }

  // New Method: Remove photo from favorites
  removeFromFavorites(photoUrl: string): void {
    const photoUrls = this.favoriteService.getFavorites();
    const updatedPhotoUrls = photoUrls.filter(url => url !== photoUrl);

    console.log('Removing Photo URL:', photoUrl);
    console.log('Updated Photo URLs:', updatedPhotoUrls);

    this.favoriteService.updateFavorites(updatedPhotoUrls);
    this.favoritePhotos = updatedPhotoUrls.map(url => this.dataURLToBlob(url));
  }
}
