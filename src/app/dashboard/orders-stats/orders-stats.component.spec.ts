import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersStatsComponent } from './orders-stats.component';

describe('OrdersStatsComponent', () => {
  let component: OrdersStatsComponent;
  let fixture: ComponentFixture<OrdersStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
