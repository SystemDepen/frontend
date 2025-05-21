import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Usuario } from '../../auth/usuario';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any; // Nome do usuário logado
  userLogged: boolean = false; // Define se o usuário está logado
  isAdmin: boolean = false; // Define se o usuário é administrador
  userCurrent: Usuario | null = null;

  constructor(public userService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      const decodedToken = jwtDecode<any>(storedUser);
      console.log('Token decodificado:', decodedToken); // Verifique aqui
      const document = decodedToken.preferred_username;
      // this.findUser(document).subscribe((user) => {
      //   console.log('Usuário retornado do serviço:', user); // Confirme o retorno do usuário
      //   this.userCurrent = user;
      //   this.user = user.name;
      //   this.isAdmin = Number(user.role) === 1;

      //   console.log('isAdmin:', this.isAdmin); // Confirme o valor de isAdmin
      // });
      this.userCurrent = decodedToken;
      this.user = decodedToken.name;
      // this.isAdmin = Number(decodedToken.role) === 1;
      const roles: string[] = decodedToken.realm_access?.roles || [];
      this.isAdmin = roles.some((role) => role === 'depen-admin');
      this.userLogged = true;
    }
  }

  // Busca os dados do usuário no serviço
  findUser(document: string): Observable<Usuario> {
    return this.userService.findUserByDocument(document);
  }

  // Função de logout
  onLogout(): void {
    localStorage.removeItem('token');
    this.userLogged = false;
    this.user = null;
    this.isAdmin = false; // Reseta a verificação de administrador
    this.router.navigate(['/sign-in']);
  }
}
