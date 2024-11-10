import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly FAVORITES_KEY = 'favoritePhotos';
  private favoritePhotosUpdated = new Subject<string[]>(); // Emits updates to favorite photos

  // Observable to subscribe to for updates
  favoritePhotosUpdated$ = this.favoritePhotosUpdated.asObservable();

  // Add photo to favorites and emit update
  addToFavorites(photo: Blob): void {
    const reader = new FileReader();
    reader.onload = () => {
      const photos = this.getFavorites();
      photos.push(reader.result as string);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(photos));
      this.favoritePhotosUpdated.next(photos); // Emit updated list
    };
    reader.readAsDataURL(photo);
  }

  removeFromFavorites(photoUrl: string): void {
    const photos = this.getFavorites().filter(url => url !== photoUrl); // Use base64 URL for comparison
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(photos));
    this.favoritePhotosUpdated.next(photos); // Emit updated list
  }

  // Retrieve favorites from localStorage
  getFavorites(): string[] {
    const photos = localStorage.getItem(this.FAVORITES_KEY);
    return photos ? JSON.parse(photos) : [];
  }

  updateFavorites(photoUrls: string[]): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(photoUrls));
    this.favoritePhotosUpdated.next(photoUrls); // Emit updated list
  }
}
