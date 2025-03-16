import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../../auth/usuario';
import { Protocols } from '../../models/protocols';
import { reqCamp } from '../../models/req_camps';
import { ProtocolsService } from '../../services/protocol.service';
import { RegisterService } from '../../services/register/register.service';
import { ReqCampService } from '../../services/req_camp.service';

// Definição da interface JwtCustomPayload
interface JwtCustomPayload {
  id: string;
  sub: string;
}

@Component({
  selector: 'send-form2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './send-form2.component.html',
  styleUrls: ['./send-form2.component.scss']
})
export class SendForm2Component {
  userId!: number;
  documentType!: string;
  selectedFiles: File[] = [];
  req: number = 0;
  form: FormGroup;
  isDropdownOpen = false; // Variável para controlar o estado do dropdown

  constructor(
    private protocolService: ProtocolsService,
    private userService: RegisterService,
    private reqService: ReqCampService) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.req = history.state.data;
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  // Alterna o estado do dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Alterna entre aberto e fechado
  }

  // Fecha a dropdown se o clique for fora dela
  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.dropdown');
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  // Método para processar a seleção do tipo de visitação
  selectVisitType(type: string) {
    this.documentType = type; // Armazena o tipo de visitação selecionado
    this.isDropdownOpen = false; // Fecha o dropdown após a seleção
  }

  // Função para buscar o usuário no backend
  findUser(id: number): Observable<Usuario[]> {
    var user = this.userService.findUserById(id);
    console.log(user);
    return user;
  }

  // Função para buscar os requerimentos no backend
  findReq(id: any): Observable<reqCamp[]> {
    var reqCamp = this.reqService.findReqById(id);
    return reqCamp;
  }

  // Função para registrar o protocolo
  handleRegisterProtocols() {
    let userCurrent: Usuario | any = null;
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      const decodedToken = jwtDecode<JwtCustomPayload>(storedUser);
      const id = Number(decodedToken.id);

      this.findUser(id).subscribe({
        next: (user) => {
          userCurrent = user;
          console.log('Usuário encontrado:', user);

          const protocol: Protocols = {
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user: {
              id: userCurrent.id
            },
            admin: null,
            doc: null,
            req_info: {
              id: this.req
            },
            status: 0
          };

          this.protocolService.save(protocol).subscribe({
            next: (response) => {
              console.log('Cadastrado com sucesso:', response);
              alert('Cadastrado com sucesso!');
            },
            error: (error) => {
              console.error('Erro ao cadastrar o protocolo:', error);
              Swal.fire({
                title: 'Erro',
                text: 'Falha ao realizar o formulário: ',
                icon: 'error',
                confirmButtonText: 'Tente novamente',
              });
            }
          });
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
          alert('Erro ao buscar usuário');
        }
      });
    }
  }
}
