import { Injectable } from "@angular/core";
import { Billet } from "../objects/billet";
import { Panier } from "../objects/panier";

@Injectable({
  providedIn: 'root',
})
/**
 * This class permit a client to have a cart to buy tickets
 * @return [description]
 */
export class PanierService {

    public panier: Panier = new Panier();

    /** GET the cart attribute */
    getPanier(){
      return this.panier;
    }

    /** Add a ticket to cart */
    addBillet(billet: Billet){
      this.panier.billets.push(billet);
    }

    /** Delete a ticket from cart */
    deleteBillet(billet: Billet){
      for(let i=0; i < this.panier.billets.length; i++){
        if(this.panier.billets[i].id==billet.id){
          this.panier.billets.splice(i,1);
        }
      }
    }

    /** get total price from cart */
    getPrice(){
      let total: number = 0;
      for(var i = 0; i<this.panier.billets.length; i++){
        total += this.panier.billets[i].place.prix;
      }
      return total;
    }
}
