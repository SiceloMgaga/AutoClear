import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsReportComponent } from './reviews-report.component';

describe('ReviewsReportComponent', () => {
  let component: ReviewsReportComponent;
  let fixture: ComponentFixture<ReviewsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
