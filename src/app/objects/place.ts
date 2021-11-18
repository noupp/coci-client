/**
 * Place class
 * A place located in a concert room and can cost + or - in terms of type of place
 */
export interface Place {
  id: number;
  type: string;
  disponibilite: number;
  prix: number;
}
