import { Billet } from "./billet";

/**
 * Cart class
 */
export class Panier {
  id: number = 0;
  date: Date = new Date();
  billets: Billet[] = [];
}
