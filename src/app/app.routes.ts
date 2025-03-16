import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// Importações dos componentes
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { SendFormComponent } from './layouts/send-form/send-form.component';
import { SendForm2Component } from './layouts/send-form2/send-form2.component';
import { SendDocumentsComponent } from './layouts/send-documents/send-documents.component';
import { HomePageComponent } from './layouts/home-page/home-page.component';
import { SobreComponent } from './layouts/sobre/sobre.component';
import { ContatosComponent } from './layouts/contatos/contatos.component';
import { TabelaSolicitantesComponent } from './layouts/tabela-solicitantes/tabela-solicitantes.component';
import { DocumentosSolicitantesComponent } from './layouts/documentos-solicitantes/documentos-solicitantes.component';
import { RegisterEditorComponent } from './layouts/register-editor/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Rota padrão
  { path: 'home', component: HomePageComponent }, // Página inicial
  { path: 'sign-in', component: LoginComponent }, // Login
  { path: 'sign-up', component: RegisterComponent }, // Registro
  { path: 'sign-up-editor', component: RegisterEditorComponent }, // Registro de editor
  { path: 'send-form', component: SendFormComponent }, // Envio de formulário parte 1
  { path: 'send-form2', component: SendForm2Component }, // Envio de formulário parte 2
  { path: 'send-document', component: SendDocumentsComponent }, // Envio de documentos
  { path: 'contatos', component: ContatosComponent }, // Página de contatos
  { path: 'sobre', component: SobreComponent }, // Página "sobre"
  { path: 'tabela-solicitantes', component: TabelaSolicitantesComponent }, // Tabela de solicitantes
  { path: 'documento-solicitantes', component: DocumentosSolicitantesComponent }, // Documentos dos solicitantes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
