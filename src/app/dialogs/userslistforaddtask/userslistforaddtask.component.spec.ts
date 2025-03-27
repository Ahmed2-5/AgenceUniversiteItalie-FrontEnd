import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserslistforaddtaskComponent } from './userslistforaddtask.component';

describe('UserslistforaddtaskComponent', () => {
  let component: UserslistforaddtaskComponent;
  let fixture: ComponentFixture<UserslistforaddtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserslistforaddtaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserslistforaddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
