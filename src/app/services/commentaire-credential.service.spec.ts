import { TestBed } from '@angular/core/testing';

import { CommentaireCredentialService } from './commentaire-credential.service';

describe('CommentaireCredentialService', () => {
  let service: CommentaireCredentialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentaireCredentialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
