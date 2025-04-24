import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocArchiveComponent } from './doc-archive.component';

describe('DocArchiveComponent', () => {
  let component: DocArchiveComponent;
  let fixture: ComponentFixture<DocArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
