import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderInputComponentComponent } from './gender-input-component.component';

describe('GenderInputComponentComponent', () => {
  let component: GenderInputComponentComponent;
  let fixture: ComponentFixture<GenderInputComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderInputComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
