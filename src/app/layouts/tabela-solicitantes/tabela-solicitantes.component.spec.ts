import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSolicitantesComponent } from './tabela-solicitantes.component';

describe('TabelaSolicitantesComponent', () => {
  let component: TabelaSolicitantesComponent;
  let fixture: ComponentFixture<TabelaSolicitantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaSolicitantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaSolicitantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
