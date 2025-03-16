import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  document: string = '';
  password: string = '';

  router = inject(Router);

  constructor(public login: LoginService) {
    this.login.removerToken();
  }

  onLogin() {
    var login = {
      document: this.document,
      password: this.password,
    };

    this.login.logar(login).subscribe({
      next: (response) => {
        if (response) this.login.addToken(response);
        this.router
          .navigateByUrl('/home', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([this.router.url]);
          });
      },
      error: (error) => {
        console.error('Erro ao fazer login', error);
      },
    });
  }
}
