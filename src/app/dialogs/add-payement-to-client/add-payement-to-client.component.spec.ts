import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayementToCLientComponent } from './add-payement-to-client.component';

describe('AddPayementToCLientComponent', () => {
  let component: AddPayementToCLientComponent;
  let fixture: ComponentFixture<AddPayementToCLientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayementToCLientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPayementToCLientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
