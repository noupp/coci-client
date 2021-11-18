import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Concert } from '../objects/concert';

@Injectable({
  providedIn: 'root',
})
/**
 * The concertService permit us to get table named "Concert" from our database throught our API :D
 * @param httpclient
 */
export class ConcertService {

  private apiUrl = 'http://localhost:4200/api/concerts';

  constructor(private http: HttpClient) {}

  /** GET all concerts in a JSONFile from API */
  getConcerts(): Observable<Concert[]> {
    return this.http
      .get<Concert[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Concert[]>('getConcerts', [])));
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
