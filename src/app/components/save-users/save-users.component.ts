import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../models/person.model';
import { SaveUsersService } from '../../service/save-users.service';

@Component({
  selector: 'app-save-users',
  templateUrl: './save-users.component.html',
  styleUrl: './save-users.component.css'
})
export class SaveUsersComponent implements OnInit {

  personForm: FormGroup;
  person: Person;

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
    
    this.person = new Person();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.savePerson(this.person)
      .subscribe((resp) => {
        this.cleanForm();
        alert('salvo com sucesso');
      }, (error) => {
        alert('error ao salvar: ' + JSON.stringify(error.error));
      });
  }
  
  cleanForm() {
    this.personForm.reset();
    this.person = new Person();
  } 
}
