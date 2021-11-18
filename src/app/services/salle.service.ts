import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Salle } from '../objects/salle';

@Injectable({
  providedIn: 'root',
})
/**
 * The salleService permit us to get table named "Salle" from our database throught our API :D
 * @param httpClient
 */
export class SalleService {

  private apiUrl = 'http://localhost:4200/api/salles';

  constructor(private http: HttpClient) {}

  /** GET all rooms in a JSONFile from API */
  getSalles(): Observable<Salle[]> {
    return this.http
      .get<Salle[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Salle[]>('getSalles', [])));
  }

  /**
   * Handle error
   * @return the error catched
   */
   private handleError<T>(operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {
       console.error(error);
       console.error(`${operation} failed: ${error.body}`);
       return of(result as T);
     };
   }
}
