import { Observable } from "rxjs";
import { Usuario } from "../auth/usuario";
import { Register } from "./register";
import { reqCamp } from "./req_camps";

export class Protocols {
    id?: number; // Adicione o ID, conforme retornado pelo JSON
    created_at!: string; // Mapeia para "created_at" no JSON
    updated_at!: string; // Mapeia para "updated_at" no JSON
    user!: Usuario | any; // Usuário associado
    req_info!: reqCamp | any; // Informações do requerimento (req_info no JSON)
    doc!: Document | null; // Documento associado
    admin!: Admin | null; // Administrador associado
    status!: number; // Status do protocolo
  }

  // export class User {
  //   id!: number;
  //   name!: string;
  //   document!: string;
  //   email!: string;
  // }

export class RequerimentoInfo {
  id!: number;
  nameVisited!: string; // Nome do visitado
  cpfRne!: string; // CPF ou RNE do visitado
  typeVisitation!: string; // Tipo de visitação
  cellphone!: string; // Telefone do visitante
  state!: string; // Estado
  city!: string; // Cidade
  district!: string; // Bairro
  street!: string; // Rua
  numberHouse!: string; // Número da casa
  subject!: string | null; // Assunto da visita
}

export class Document {
  title!: string; // Título do documento
  fileUrl!: string; // URL
}

export class Admin {
  name!: string; // Nome do administrador
  role!: string; // Papel do administrador
}
