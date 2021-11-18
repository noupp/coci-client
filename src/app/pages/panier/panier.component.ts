import { Component, OnInit } from '@angular/core';
import { Billet } from 'src/app/objects/billet';
import { Place } from 'src/app/objects/place';
import { PanierService } from 'src/app/services/panier.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  billets : Billet[] = [];
  total: number = 0;

  constructor(private panierService : PanierService, private placeService : PlaceService) {
  }

  ngOnInit(): void {
    // load informations we need from cart
    this.getBilletsFromCart();
    this.getPriceFromCart();
  }

  /** Get tickets in customer cart */
  getBilletsFromCart(){
    this.billets = this.panierService.getPanier().billets;
  }

  /** Get total price from cart */
  getPriceFromCart(){
    this.total = this.panierService.getPrice();
  }

  /** Delete ticket from cart */
  deleteFromCart(billet: Billet,place : Place){
    let newPlace: Place = place;
    newPlace.disponibilite = 1;
    this.panierService.deleteBillet(billet);
    this.placeService.postPlace(newPlace);
  }

  /** Pay your tickets */
  pay(){
    //TODO : create a command
  }

}
