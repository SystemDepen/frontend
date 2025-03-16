import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { IBGEService } from '../../services/bge.service';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import Swal from 'sweetalert2';
import { IBGECityResponse, IBGEUFResponse } from '../../models/IBGEUF';
import { reqCamp } from '../../models/req_camps';
import { LocalStorageService } from '../../services/localStorage.service';
import { ReqCampService } from '../../services/req_camp.service';

@Component({
  selector: 'component-form',
  standalone: true,
  imports: [
    MdbFormsModule,
    CommonModule,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
  providers: [provideNgxMask({})],
})
export class formComponent implements OnInit {
  router = inject(Router);
  form: FormGroup;

  UF: IBGEUFResponse[] = [];
  cities: IBGECityResponse[] = [];
  documentType: 'RNE' | 'RG' = 'RG';

  typeVisit = [
    { label: 'Parentes', value: 'Parentes' },
    { label: 'Amigos', value: 'Amigos' },
    { label: 'Visita da igreja', value: 'Visita da igreja' },
  ];

  reqOptions = [
    { label: 'Visita social', value: 'Visita social' },
    { label: 'Visita assistida', value: 'Visita assistida' },
    { label: 'Visita íntima', value: 'Visita íntima' },
  ];

  user: any;

  constructor(
    private ibgeService: IBGEService,
    private req_campService: ReqCampService,
    private localStorageService: LocalStorageService,
  ) {
    this.form = new FormGroup({
      name_visited: new FormControl('', Validators.required),
      cpf_rne: new FormControl('', Validators.required),
      cellphone: new FormControl('', Validators.required),
      type_visitation: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number_house: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.listAllUFS();
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      const decodedToken = jwtDecode(storedUser);
      this.user = decodedToken;
      console.log(this.user.id);
    }
  }

  listAllUFS(): void {
    this.ibgeService.listAllUFs().subscribe({
      next: (ufList) => {
        this.UF = ufList;
      },
      error: (err) => console.error('Erro ao listar UFs:', err),
    });
  }

  listAllCities(sigla: string | null): void {
    this.ibgeService.listAllCities(sigla).subscribe({
      next: (cityList) => {
        this.cities = cityList;
      },
      error: (err) => console.log('Erro ao listar CIDADES:', err),
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      let dat_user = { id: this.user.id };
      const formData: reqCamp = this.form.value;
      const data = {
        ...formData,
        id_user: dat_user,
      };

      console.log(data);

      const requerimentoInfo: reqCamp = {
        id: null,
        name_visited: data.name_visited,
        cpf_rne: data.cpf_rne,
        type_visitation: data.type_visitation,
        cellphone: data.cellphone,
        state: data.state,
        city: data.city,
        district: data.district,
        street: data.street,
        number_house: data.number_house,
      };

      this.req_campService.save(requerimentoInfo).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Cadastro realizado com sucesso',
            icon: 'success',
            confirmButtonText: 'Seguir para o envio de documentos',
          });
          this.router.navigate(['/send-form2'], { state: { data: response.id } });
        },
        error: (error) => {
          console.log(error);

          if (error.status === 400 && error.error.errors) {
            this.clearFormErrors();

            error.error.errors.forEach((err: { field: string; message: string }) => {
              const control = this.form.get(err.field);
              if (control) {
                control.setErrors({ backend: err.message });
              }
            });

            Swal.fire({
              title: 'Erro',
              text: 'Falha ao realizar o formulário: Verifique os campos.',
              icon: 'error',
              confirmButtonText: 'Tente novamente',
            });
          } else {
            Swal.fire({
              title: 'Erro',
              text: 'Falha ao enviar o formulário. Tente novamente mais tarde.',
              icon: 'error',
              confirmButtonText: 'Fechar',
            });
          }
        },
      });
    } else {
      console.log('Formulário inválido', this.form);
      this.highlightInvalidFields();
    }
  }

  highlightInvalidFields(): void {
    const invalidFields: string[] = [];
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control && control.invalid) {
        invalidFields.push(this.getFieldLabel(key));
      }
    });

    if (invalidFields.length > 0) {
      Swal.fire({
        title: 'Campos Obrigatórios',
        html: `
          <p>Os seguintes campos precisam ser preenchidos:</p>
          <ul>
            ${invalidFields.map((field) => `<li>${field}</li>`).join('')}
          </ul>
        `,
        icon: 'warning',
        confirmButtonText: 'Fechar',
      });
    }
  }

  getFieldLabel(fieldName: string): string {
    const fieldLabels: { [key: string]: string } = {
      name_visited: 'Nome do Visitado',
      cpf_rne: 'CPF/RNE',
      cellphone: 'Celular',
      type_visitation: 'Tipo de Visitação',
      state: 'Estado',
      city: 'Cidade',
      district: 'Bairro',
      street: 'Rua',
      number_house: 'Número da Casa',
    };

    return fieldLabels[fieldName] || fieldName;
  }

  clearFormErrors(): void {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control) {
        control.setErrors(null);
      }
    });
  }
}
