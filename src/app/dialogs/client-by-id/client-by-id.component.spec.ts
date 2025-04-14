import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientByIdComponent } from './client-by-id.component';

describe('ClientByIdComponent', () => {
  let component: ClientByIdComponent;
  let fixture: ComponentFixture<ClientByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
