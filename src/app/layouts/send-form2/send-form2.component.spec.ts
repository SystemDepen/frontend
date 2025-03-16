import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendForm2Component } from './send-form2.component';

describe('SendForm2Component', () => {
  let component: SendForm2Component;
  let fixture: ComponentFixture<SendForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendForm2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
