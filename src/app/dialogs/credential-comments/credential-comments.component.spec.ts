import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialCommentsComponent } from './credential-comments.component';

describe('CredentialCommentsComponent', () => {
  let component: CredentialCommentsComponent;
  let fixture: ComponentFixture<CredentialCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
