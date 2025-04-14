import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCondidatComponent } from './update-condidat.component';

describe('UpdateCondidatComponent', () => {
  let component: UpdateCondidatComponent;
  let fixture: ComponentFixture<UpdateCondidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCondidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
