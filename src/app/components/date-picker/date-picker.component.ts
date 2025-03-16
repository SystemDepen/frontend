import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'], // Corrigido para "styleUrls"
})
export class DatePickerComponent {
  @Output() birthDateChange = new EventEmitter<string>(); // Emissor de evento
  @Output() genderChange = new EventEmitter<string>(); // Emissor de gênero

  form: FormGroup;
  maxDate: string = new Date().toISOString().split('T')[0]; // Data máxima é hoje

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
    });

    // Detecta mudanças no campo e emite o valor para o componente pai
    this.form.get('birthDate')?.valueChanges.subscribe((value) => {
      this.birthDateChange.emit(value);
    });
  }

  onGenderChange() {
    const gender = this.form.get('gender')?.value;
    this.genderChange.emit(gender);
    console.log('Gênero selecionado:', gender);
  }
}
