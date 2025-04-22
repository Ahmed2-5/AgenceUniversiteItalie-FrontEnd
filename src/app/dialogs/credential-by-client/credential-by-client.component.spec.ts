import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialByClientComponent } from './credential-by-client.component';

describe('CredentialByClientComponent', () => {
  let component: CredentialByClientComponent;
  let fixture: ComponentFixture<CredentialByClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialByClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
