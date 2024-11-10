import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly API_URL = 'https://picsum.photos/200/300';

  // BehaviorSubject to hold the selected photo Blob
  private selectedPhotoBlob = new BehaviorSubject<Blob | null>(null);
  selectedPhotoBlob$ = this.selectedPhotoBlob.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch a batch of photos
  getRandomPhotos(count: number = 6): Observable<Blob[]> {
    const requests = Array.from({ length: count }, () =>
      this.http.get(this.API_URL, { responseType: 'blob' }).pipe(
        delay(Math.random() * 100 + 200)
      )
    );
    return forkJoin(requests);
  }

  // Method to set the selected photo Blob
  setSelectedPhotoBlob(blob: Blob) {
    this.selectedPhotoBlob.next(blob);
  }
}
