import { Component } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-send-documents',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './send-documents.component.html',
  styleUrl: './send-documents.component.scss'
})
export class SendDocumentsComponent {

}
