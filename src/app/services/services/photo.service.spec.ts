import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import HttpClientTestingModule to mock HTTP requests
      providers: [PhotoService]           // Provide PhotoService
    });

    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);  // Inject HttpTestingController
  });

  afterEach(() => {
    httpMock.verify();  // Ensure there are no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch random photos', () => {
    // Prepare mock response data (a list of 3 Blob objects)
    const mockPhotos: Blob[] = [new Blob(), new Blob(), new Blob()];

    // Call the service method to fetch 3 random photos
    service.getRandomPhotos(3).subscribe(photos => {
      // Ensure that 3 photos are returned
      expect(photos.length).toBe(3);
      // Ensure that the photos returned are the same as the mock response
      expect(photos).toEqual(mockPhotos);
    });

    // Expect 3 HTTP GET requests to be made to the API URL
    const reqs = httpMock.match('https://picsum.photos/200/300');
    expect(reqs.length).toBe(3);

    // Provide a response for each request
    reqs.forEach(req => {
      req.flush(new Blob());  // Simulate a successful response with a Blob object for each photo
    });
  });
});
