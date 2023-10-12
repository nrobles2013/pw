import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBlankComponent } from './app-blank.component';

describe('AppBlankComponent', () => {
  let component: AppBlankComponent;
  let fixture: ComponentFixture<AppBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBlankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
