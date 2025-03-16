import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../auth/usuario';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;                    // Nome do usuário logado
  userLogged: boolean = false;  // Define se o usuário está logado
  isAdmin: boolean = false;     // Define se o usuário é administrador
  userCurrent: Usuario | null = null;

  constructor(public userService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      const decodedToken = jwtDecode<any>(storedUser);
      console.log('Token decodificado:', decodedToken); // Verifique aqui
      const id = Number(decodedToken.id);
      this.findUser(id).subscribe((user) => {
        console.log('Usuário retornado do serviço:', user); // Confirme o retorno do usuário
        this.userCurrent = user;
        this.user = user.name;
        this.isAdmin = Number(user.role) === 1;

        console.log('isAdmin:', this.isAdmin); // Confirme o valor de isAdmin
      });
      this.userLogged = true;
    }
  }
  

  // Busca os dados do usuário no serviço
  findUser(id: number): Observable<Usuario> {
    return this.userService.findSingleUserById(id);
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
