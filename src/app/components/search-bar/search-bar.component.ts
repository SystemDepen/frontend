import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();

  // Emitir o valor da pesquisa para o componente pai
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;  // Cast do tipo do evento para HTMLInputElement
    if (input) {
      this.search.emit(input.value);  // Emite o valor da pesquisa
    }
  }
}
