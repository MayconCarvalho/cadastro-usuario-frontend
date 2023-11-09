import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
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

    savePerson(person: Person): Observable<any> {
        return this.http.post<Person>(`${API_CONFIG.baseUrl}/person/`, person, this.httpPostOptions);
    }
}
