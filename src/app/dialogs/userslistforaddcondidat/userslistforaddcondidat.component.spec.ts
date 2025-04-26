import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserslistforaddcondidatComponent } from './userslistforaddcondidat.component';

describe('UserslistforaddcondidatComponent', () => {
  let component: UserslistforaddcondidatComponent;
  let fixture: ComponentFixture<UserslistforaddcondidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserslistforaddcondidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserslistforaddcondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
