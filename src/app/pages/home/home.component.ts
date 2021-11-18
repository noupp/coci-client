import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Billet } from 'src/app/objects/billet';
import { Concert } from 'src/app/objects/concert';
import { Place } from 'src/app/objects/place';
import { Salle } from 'src/app/objects/salle';
import { ConcertService } from 'src/app/services/concert.service';
import { PanierService } from 'src/app/services/panier.service';
import { PlaceService } from 'src/app/services/place.service';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/**
 * Home page
 * @param placeService
 * @param concertService
 * @param salleService
 * @param panierService
 * @param router
 */
export class HomeComponent implements OnInit {

  concert_date : String = "06.04.2022";
  concert_name : String = "Nolan Matin, Je suis un guerrier";
  salle_name: String = "Montauban";
  salle_address: String = "6 avenue de clavières, 30100 ALES";
  concerts: Concert[] = [];
  salles: Salle[] = [];
  places : Place[] = [];

  constructor(
    private placeService: PlaceService,
    private concertService: ConcertService,
    private salleService: SalleService,
    private panierService : PanierService,
  ) { }

  ngOnInit(): void {
    /** Load informations from database we need */
    this.getPlaces();
    this.getConcerts();
    this.getSalles();
  }

  /** Get all places from JSONFile to type Place */
  getPlaces(){
    this.placeService
      .getPlaces()
      .pipe(
        mergeMap(places => from(places)),
        tap(place => {
          this.places.push(place);
        })
      )
      .subscribe(() => {});
  }

  /** Get all concerts from JSONFile to type Concert */
  getConcerts(){
    this.concertService
    .getConcerts()
    .pipe(
      mergeMap(concerts => from(concerts)),
      tap(concert => {
        this.concerts.push(concert);
      })
    )
  }

  /** Get all rooms from JSONFile to type Salle */
  getSalles(){
    this.salleService
    .getSalles()
    .pipe(
      mergeMap(salles => from(salles)),
      tap(salle => {
        this.salles.push(salle);
      })
    )
  }

  /** Add a place to cart */
  addToCart(place : Place){
    // send to database that place is not available anymore
    let newPlace: Place = place;
    newPlace.disponibilite = 0;
    // create a ticket with place inside
    var billet: Billet = new Billet(newPlace);
    this.panierService.addBillet(billet);
    this.placeService.postPlace(newPlace);
  }

  /** Check if place is available */
  estDispo(place : Place) : boolean{
    let disable : boolean = false;
    // disable buy button if place isn't available
    if(place.disponibilite === 0){
      disable = true;
    }
    return disable;
  }

}
