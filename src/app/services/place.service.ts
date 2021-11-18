import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Place } from '../objects/place';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
/**
 * The placeService permit us to get table named "Place" from our database throught our API :D
 * @param httpClient
 * @param router
 */
export class PlaceService {

  private apiUrl = 'http://localhost:4200/api/places';
  private apiUrlPlace = 'http://localhost:4200/api/place'

  constructor(private http: HttpClient, private router: Router) {}

  /** GET all places in a JSONFile from API */
  getPlaces(): Observable<Place[]> {
    return this.http
      .get<Place[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Place[]>('getPlaces', [])));
  }

  /** POST a specific place in a JSONFile to the API */
  postPlace(place : Place){
    let placeJSON : JSON = JSON.parse(JSON.stringify(place));
    return this.http.post(this.apiUrlPlace, placeJSON, {observe: 'response'}).subscribe(
      success => {
        console.log('postEvaluation call is successful', success);
        this.router.navigate(['/', 'panier'])
        .then(
          err => {
          console.log(err) // when there's an error log it
        }
      );
      },
      error => {
        console.log(error);
      }
    );
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
