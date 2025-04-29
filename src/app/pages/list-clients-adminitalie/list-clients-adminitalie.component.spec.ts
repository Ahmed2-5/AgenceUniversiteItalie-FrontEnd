import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientsAdminitalieComponent } from './list-clients-adminitalie.component';

describe('ListClientsAdminitalieComponent', () => {
  let component: ListClientsAdminitalieComponent;
  let fixture: ComponentFixture<ListClientsAdminitalieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClientsAdminitalieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientsAdminitalieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
