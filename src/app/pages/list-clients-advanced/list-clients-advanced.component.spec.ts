import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientsAdvancedComponent } from './list-clients-advanced.component';

describe('ListClientsAdvancedComponent', () => {
  let component: ListClientsAdvancedComponent;
  let fixture: ComponentFixture<ListClientsAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClientsAdvancedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientsAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
