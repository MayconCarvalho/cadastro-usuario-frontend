import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonDTO } from '../../models/personDTO.model';
import { SaveUsersService } from '../../service/save-users.service';

@Component({
  selector: 'app-save-users',
  templateUrl: './save-users.component.html',
  styleUrl: './save-users.component.css'
})
export class SaveUsersComponent implements OnInit {

  personForm: FormGroup;
  person: PersonDTO;
  visibleModal: boolean;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: SaveUsersService
  ) {
    this.personForm = this.formBuilder.group({
      name: ['', 
        Validators.compose(
          [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
        )
      ],
      email: ['', 
        Validators.compose(
          [Validators.required, Validators.email]
        )
      ],
      password: ['', 
        Validators.compose(
          [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
        )
      ],
      confirmPassword: ['', 
        Validators.compose(
          [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
        )
      ],
    });
    
    this.person = new PersonDTO();
    this.visibleModal = false;
    this.message = '';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.savePerson(this.person)
      .subscribe({
        next: (resp) => {
          this.cleanForm();
          this.openDialog(`Registro ${resp.name} salvo com sucesso.`);
        },
        error: (error) => {
          this.openDialog(`Error ao salvar registro: ${JSON.stringify(error.error||error.message)}`);
        }
      });
  }
  
  cleanForm() {
    this.personForm.reset();
    this.person = new PersonDTO();
  } 

  openDialog(message: string): void {
    this.message = message;
    this.visibleModal = true;
  }

  closeDialog() {
    this.visibleModal = false;
    this.message = '';
  }
}
