import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonDTO } from '../../models/personDTO.model';
import { SaveUsersService } from '../../service/save-users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-save-users',
  templateUrl: './save-users.component.html',
  styleUrl: './save-users.component.css'
})
export class SaveUsersComponent implements OnInit {

  personForm: FormGroup;
  person: PersonDTO;

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
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.savePerson(this.person)
      .subscribe({
        next: (resp) => {
          this.cleanForm();
          alert('salvo com sucesso');
        },
        error: (error: HttpErrorResponse) => {
          alert('error ao salvar: ' + JSON.stringify(error.error));
        }
      });
  }
  
  cleanForm() {
    this.personForm.reset();
    this.person = new PersonDTO();
  } 
}
