import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Protocols } from '../../models/protocols';
import { reqCamp } from '../../models/req_camps';
import { ReqDocsService } from '../../services/documents/req_docs.service';
import { ProtocolsService } from '../../services/protocol.service';

@Component({
  selector: 'app-documentos-solicitantes',
  templateUrl: './documentos-solicitantes.component.html',
  styleUrls: ['./documentos-solicitantes.component.scss']
})
export class DocumentosSolicitantesComponent implements OnInit {
  protocol!: Protocols;
  reqInfo!: reqCamp;

  constructor(
    private router: Router,
    private protocolsService: ProtocolsService,
    private documentoService: ReqDocsService
  ) {}

  ngOnInit(): void {
    const navigationState = history.state; // Captura o estado da navegação
    console.log('Estado recebido:', navigationState); // Log para debug

    if (navigationState && navigationState['protocol']) {
      this.protocol = navigationState['protocol']; // Atribui o protocolo recebido
      console.log(this.protocol.req_info);
      this.reqInfo = this.protocol.req_info;
      console.log(this.reqInfo)

      const token = localStorage.getItem('token');
      // if (token) {
      //   const userId = Number(jwtDecode<JwtCustomPayload>(token).id);
      //   this.documentoService.getDocumentsByUser(userId).subscribe({
      //     next: (docs) => (this.documents = docs),
      //     error: (err) => console.error('Erro ao buscar documentos', err),
      //   });
      // }
    } else {
      console.error('Nenhum protocolo recebido.');
      this.router.navigate(['/tabela-solicitantes']); // Redireciona caso não haja protocolo
    }
  }

  // Método para aceitar o protocolo (alterando o status para 1)
  aceitarProtocolo(): void {
    if (this.protocol) {
      this.protocol.status = 1;  // Mudando o status para "aprovado"
      this.salvarStatusNoBanco(this.protocol);
    }
  }

  // Método para rejeitar o protocolo (alterando o status para 2)
  rejeitarProtocolo(): void {
    if (this.protocol) {
      this.protocol.status = 2;  // Mudando o status para "recusado"
      this.salvarStatusNoBanco(this.protocol);
    }
  }

  // Função para salvar as alterações no banco
  salvarStatusNoBanco(protocol: Protocols): void {
    var id = protocol.id
    this.protocolsService.update(protocol, id).subscribe(
      (updatedProtocol) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Status atualizado com sucesso',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate(['/tabela-solicitantes']);
      },
      (error) => {
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao atualizar status do protocolo',
          icon: 'error',
          confirmButtonText: 'Seguir para o Login',
        });
        // Mostrar mensagem de erro ao usuário
      }
    );
  }
}
