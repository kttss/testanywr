import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      imports: [RouterTestingModule],
      providers: [
        Title,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { title: '404 | ANYWR' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.ngOnInit();
    titleService = TestBed.inject(Title);
    fixture.detectChanges();
  });

  it('should create not found component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 404 Image', () => {
    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain('404.jpg');

    const image = new Image();
    image.src = imgElement.src;

    return new Promise<void>((resolve, reject) => {
      image.onload = () => {
        expect(image.complete).toBe(true);
        resolve();
      };

      image.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    });
  });

  it('should set the correct page title', () => {
    expect(titleService.getTitle()).toBe('404 | ANYWR');
  });
});
