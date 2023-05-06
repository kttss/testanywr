import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfilComponent } from './profil.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilCardComponent } from './components/profil-card/profil-card.component';

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilComponent, ProfilCardComponent],
      imports: [HttpClientModule, SharedModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { title: 'Profil | ANYWR' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    fixture.detectChanges();
  });

  it('should set the correct page title', () => {
    expect(titleService.getTitle()).toBe('Profil | ANYWR');
  });
});
