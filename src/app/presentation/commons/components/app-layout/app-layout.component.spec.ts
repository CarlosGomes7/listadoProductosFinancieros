import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutComponent } from './app-layout.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [],
      imports:[
        AppLayoutComponent,
        RouterOutlet,
        RouterLink,
        LoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
