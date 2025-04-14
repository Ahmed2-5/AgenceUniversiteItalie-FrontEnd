import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCondidatComponent } from './add-condidat.component';

describe('AddCondidatComponent', () => {
  let component: AddCondidatComponent;
  let fixture: ComponentFixture<AddCondidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCondidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
