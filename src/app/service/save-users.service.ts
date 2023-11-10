import { Injectable } from '@angular/core';
import { PersonDTO } from '../models/personDTO.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
        return this.http.post<PersonDTO>(`${API_CONFIG.baseUrl}/person/`, 
            person, this.httpPostOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = error.status != 0 ? `${error.error}` : `${error.message}`;
        return throwError(() => new Error(errorMessage));
    }
}
