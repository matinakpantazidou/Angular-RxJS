import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoStreamComponent } from './photo-stream.component';
import { PhotoService } from 'src/app/services/services/photo.service';
import { FavoriteService } from 'src/app/services/services/favorite.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PhotoStreamComponent', () => {
  let component: PhotoStreamComponent;
  let fixture: ComponentFixture<PhotoStreamComponent>;
  let photoServiceMock: jasmine.SpyObj<PhotoService>;
  let favoriteServiceMock: jasmine.SpyObj<FavoriteService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Mock the PhotoService, FavoriteService, and Router
    photoServiceMock = jasmine.createSpyObj('PhotoService', ['getRandomPhotos']);
    favoriteServiceMock = jasmine.createSpyObj('FavoriteService', ['addToFavorites']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Mock getRandomPhotos method to return an observable of an empty array or test data
    photoServiceMock.getRandomPhotos.and.returnValue(of([]));  // Mocked return value

    TestBed.configureTestingModule({
      declarations: [PhotoStreamComponent],
      providers: [
        { provide: PhotoService, useValue: photoServiceMock },
        { provide: FavoriteService, useValue: favoriteServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    fixture = TestBed.createComponent(PhotoStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Ensure the component is created
    expect(component).toBeTruthy();

    // Check that the photos array is initialized and is an empty array
    expect(component.photos).toBeDefined();
    expect(component.photos.length).toBe(0);

    // Ensure the loadMorePhotos method is called once
    expect(photoServiceMock.getRandomPhotos).toHaveBeenCalled();
  });
});
