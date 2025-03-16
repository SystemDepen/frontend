import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MdbFormsModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterEditorComponent {
  registerForm: FormGroup;
  router = inject(Router);

  constructor(public register: RegisterService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      document: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      birthDate: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
    console.log(this.registerForm)
  }

  onRegister() {
    if (this.registerForm.valid) {
      const userCurrent = this.registerForm.value;
      this.register.handleRegister(userCurrent, 1).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Cadastro realizado com sucesso',
            icon: 'success',
            confirmButtonText: 'Seguir para o Login',
          });
          this.router.navigate(['/sign-in']);
        },
        error: (error) => {
          Swal.fire({
            title: 'Erro',
            text: 'Falha ao realizar cadastro',
            icon: 'error',
            confirmButtonText: 'Tente novamente',
          });
        },
      });
    } else {
      this.handleFormErrors();
    }
  }

  handleFormErrors() {
    const errors: string[] = [];

    // Verificando campo 'name'
    if (this.registerForm.get('name')?.hasError('required')) {
      errors.push('Nome Completo é obrigatório');
    }

    // Verificando campo 'document'
    if (this.registerForm.get('document')?.hasError('required')) {
      errors.push('CPF ou RNE é obrigatório');
    }

    // Verificando campo 'email'
    if (this.registerForm.get('email')?.hasError('required')) {
      errors.push('Email é obrigatório');
    } else if (this.registerForm.get('email')?.hasError('email')) {
      errors.push('Email inválido');
    }

    // Verificando campo 'password'
    if (this.registerForm.get('password')?.hasError('required')) {
      errors.push('Senha é obrigatória');
    } else if (this.registerForm.get('password')?.hasError('minlength')) {
      errors.push('A senha deve ter no mínimo 6 caracteres');
    }

    // Verificando campo 'birthDate'
    if (this.registerForm.get('birthDate')?.hasError('required')) {
      errors.push('Data de nascimento é obrigatória');
    }

    // Verificando campo 'gender'
    if (this.registerForm.get('gender')?.hasError('required')) {
      errors.push('Gênero é obrigatório');
    }

    //swal
    if (errors.length > 0) {
      Swal.fire({
        title: 'Erro no formulário',
        html: `<ul><li>${errors.join('</li><li>')}</li></ul>`,
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }


  onBirthDateChange(date: string) {
    this.registerForm.get('birthDate')?.setValue(date);
  }

  onGenderChange(gender: string) {
    this.registerForm.get('gender')?.setValue(gender);
  }
}
