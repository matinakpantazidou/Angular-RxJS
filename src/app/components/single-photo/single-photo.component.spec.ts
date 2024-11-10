import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SinglePhotoComponent } from './single-photo.component';
import { PhotoService } from 'src/app/services/services/photo.service';
import { of } from 'rxjs';

describe('SinglePhotoComponent', () => {
  let component: SinglePhotoComponent;
  let fixture: ComponentFixture<SinglePhotoComponent>;
  let photoService: jasmine.SpyObj<PhotoService>;

  beforeEach(async () => {
    // Create a spy object for PhotoService and mock all required observables
    const photoServiceSpy = jasmine.createSpyObj('PhotoService', ['getRandomPhotos', 'setSelectedPhotoBlob'], {
      selectedPhotoBlob$: of(new Blob(['dummy data'], { type: 'image/jpeg' })) // Mock selectedPhotoBlob$ observable
    });

    await TestBed.configureTestingModule({
      declarations: [SinglePhotoComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: PhotoService, useValue: photoServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(SinglePhotoComponent);
    component = fixture.componentInstance;
    component.photoId = 'somePhotoId'; // Set any necessary inputs or data
    fixture.detectChanges();

    photoService = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;
  });

  it('should set img src attribute to photoUrl', () => {
    component.photoUrl = 'base64Url';
    fixture.detectChanges();

    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgElement.src).toContain('base64Url'); // Check that src includes base64Url
  });

  it('should have alt attribute set to "Selected Photo"', () => {
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgElement.alt).toBe('Selected Photo');
  });

});
