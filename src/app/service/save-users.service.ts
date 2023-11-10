import { Injectable } from '@angular/core';
import { PersonDTO } from '../models/personDTO.model';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaveUsersService {
  
    private httpPostOptions: any = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    constructor(private http: HttpClient) {
    }

    savePerson(person: PersonDTO): Observable<any> {
        return this.http.post<PersonDTO>(`${API_CONFIG.baseUrl}/person/`, person, this.httpPostOptions);
    }
}
