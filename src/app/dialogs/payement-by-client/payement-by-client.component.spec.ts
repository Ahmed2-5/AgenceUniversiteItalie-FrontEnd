import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementByClientComponent } from './payement-by-client.component';

describe('PayementByClientComponent', () => {
  let component: PayementByClientComponent;
  let fixture: ComponentFixture<PayementByClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementByClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayementByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
