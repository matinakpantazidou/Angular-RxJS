import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { PhotoService } from 'src/app/services/services/photo.service';
import { Subscription } from 'rxjs';
import { FavoriteService } from 'src/app/services/services/favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss']
})
export class SinglePhotoComponent implements OnInit, OnDestroy {
  @Input() photoId!: string;
  photoUrl: string | null = null; // Base64 URL
  private subscription!: Subscription;

  constructor(
    private photoService: PhotoService,
    private favoriteService: FavoriteService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Subscribe to the selected photo Blob
    this.subscription = this.photoService.selectedPhotoBlob$.subscribe(blob => {
      if (blob) {
        this.convertBlobToBase64(blob).then(base64Url => {
          this.photoUrl = base64Url;
          this.cdr.detectChanges(); // Manually trigger change detection
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Convert Blob to base64 URL string
  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        reject('Failed to convert Blob to base64');
      };
    });
  }

  // Remove from favorites using base64 URL
  async removeFromFavorites(): Promise<void> {
    if (!this.photoUrl) {
      console.error('Failed to remove photo: No photo URL available');
      return;
    }

    try {
      await this.favoriteService.removeFromFavorites(this.photoUrl);
      this.router.navigate(['/favorites']); // Navigate back to the favorites list
    } catch (error) {
      console.error('Error removing photo from favorites:', error);
    }
  }
}
