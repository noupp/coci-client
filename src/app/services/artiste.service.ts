import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Artiste } from '../objects/artiste';

@Injectable({
  providedIn: 'root',
})
/**
 * The artisteService permit us to get table named "Artiste" from our database throught our API :D
 * @param httpClient
 */
export class ArtisteService {

  private apiUrl = 'http://localhost:4200/api/artistes';

  constructor(private http: HttpClient) {}

  /** GET all artists in a JSONFile from API */
  getArtistes(): Observable<Artiste[]> {
    return this.http
      .get<Artiste[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Artiste[]>('getArtistes', [])));
  }

  /** GET one artist by name in a JSONFile from API */
  getArtiste(name: string): Observable<Artiste> {
    return this.http
      .get<Artiste>(`${this.apiUrl}/${name}`)
      .pipe(catchError(this.handleError<Artiste>('getArtiste')));
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
