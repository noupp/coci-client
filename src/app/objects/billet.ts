import { Place } from "./place";

/**
 * Ticket class
 * @param place : the place that customer wants to buy
 */
export class Billet {
  id: number = 0;
  place!: Place;

  constructor(place: Place){
    this.place = place;
  }
}
