import { Component, OnInit } from '@angular/core';
import { ProtocolsService } from '../../services/protocol.service';
import { Protocols } from '../../models/protocols';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-tabela-solicitantes',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './tabela-solicitantes.component.html',
  styleUrls: ['./tabela-solicitantes.component.scss'],
})
export class TabelaSolicitantesComponent implements OnInit {
  protocols: Protocols[] = [];
  filteredProtocols: Protocols[] = []; // Protocolos filtrados  saaas

  constructor(private protocolsService: ProtocolsService, private router: Router) {}

  ngOnInit(): void {
    this.loadProtocols();
  }

  loadProtocols(): void {
    this.protocolsService.findAll().subscribe(
      (data) => {
        this.protocols = data.filter(protocol => protocol.status === 0); // Filtra apenas os protocolos com status 0
        this.filteredProtocols = this.protocols; // Inicializa os protocolos filtrados
      },
      (error) => {
        console.error('Erro ao carregar protocolos:', error);
      }
    );
  }
  

  handleProtocol(protocol: Protocols): void {
    console.log('Protocol enviado:', protocol); // Log do protocolo
    this.router.navigate(['/documento-solicitantes'], { state: { protocol } });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Data inválida';
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  }

  // Função chamada quando a barra de pesquisa for usada
  onSearch(searchTerm: string): void {
    this.filteredProtocols = this.protocols.filter(protocol =>
      protocol.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (protocol.id !== undefined && protocol.id.toString().includes(searchTerm)) // Filtra pelo nome ou número do protocolo
    );
  }
}
