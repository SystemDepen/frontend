import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosSolicitantesComponent } from './documentos-solicitantes.component';

describe('DocumentosSolicitantesComponent', () => {
  let component: DocumentosSolicitantesComponent;
  let fixture: ComponentFixture<DocumentosSolicitantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosSolicitantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosSolicitantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
