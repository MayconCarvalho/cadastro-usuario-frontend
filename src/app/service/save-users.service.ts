import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class SaveUsersService {
  
    private httpPostOptions: any = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
        })
    };
    
    constructor(private http: HttpClient) {
    }

    savePerson(person: Person) {
        return this.http.post<Person>(`${API_CONFIG.baseUrl}/person/`, person, this.httpPostOptions);
    }
}
