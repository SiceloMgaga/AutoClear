import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsStatsComponent } from './vendors-stats.component';

describe('VendorsStatsComponent', () => {
  let component: VendorsStatsComponent;
  let fixture: ComponentFixture<VendorsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorsStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
