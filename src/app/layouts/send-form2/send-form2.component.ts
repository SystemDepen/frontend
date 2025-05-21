import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../../auth/usuario';
import { Protocols } from '../../models/protocols';
import { reqCamp } from '../../models/req_camps';
import { ReqDocsService } from '../../services/documents/req_docs.service';
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
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './send-form2.component.html',
  styleUrls: ['./send-form2.component.scss'],
})
export class SendForm2Component {
  userId!: number;

  selectedFiles: File[] = [];
  req: number = 0;
  form: FormGroup;
  isDropdownOpen = false; // Variável para controlar o estado do dropdown
  router = inject(Router);

  constructor(
    private protocolService: ProtocolsService,
    private userService: RegisterService,
    private reqService: ReqCampService,
    private documentService: ReqDocsService
  ) {
    this.form = new FormGroup({
      documentType: new FormControl('cpf'),
    });
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

  // Função para buscar o usuário no backend
  findUser(document: string): Observable<Usuario> {
    return this.userService.findUserByDocument(document);
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
      const decodedToken = jwtDecode<any>(storedUser);
      const document = decodedToken.preferred_username;
       // <-- importante para o upload usar!

      const selectedType = this.form.get('documentType')?.value;

      this.findUser(document).subscribe({
        next: (user) => {
          // 1. Envia o documento
          console.log(user)
          this.userId = Number(user?.id);
          this.documentService
            .save(this.userId, selectedType, this.selectedFiles)
            .subscribe({
              next: (uploadResponse) => {
                console.log('Upload ok:', uploadResponse);
                Swal.fire({
                  title: 'Sucesso!',
                  text: 'Documento enviado com sucesso',
                  icon: 'success',
                  confirmButtonText: 'Ok',
                });
                // 2. Agora envia o protocolo
                const protocol: Protocols = {
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  user: {
                    id: this.userId,
                  },
                  admin: null,
                  doc: null, // << não envia arquivos aqui, pois já foram enviados!
                  req_info: { id: this.req },
                  status: 0,
                };

                this.protocolService.save(protocol).subscribe({
                  next: (response) => {
                    console.log('Cadastrado com sucesso:', response);
                    alert('Cadastrado com sucesso!');
                  },
                  error: (error) => {
                    console.error('Erro ao cadastrar protocolo:', error);
                    Swal.fire({
                      title: 'Erro',
                      text: 'Erro ao cadastrar protocolo',
                      icon: 'error',
                      confirmButtonText: 'Ok',
                    });
                  },
                });
              },
              error: (err) => {
                console.error('Erro ao fazer upload:', err);
                Swal.fire({
                  title: 'Erro',
                  text: 'Erro ao enviar documento.',
                  icon: 'error',
                  confirmButtonText: 'Ok',
                });
              },
            });
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
          alert('Erro ao buscar usuário');
        },
      });
    }
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  handleNavigateStatus() {
    this.router.navigate(['/send-documents']);
  }
}
