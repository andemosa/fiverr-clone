export interface IOrder {
  _id: string;
  gig: string;
  image: string;
  title: string;
  price: number;
  seller: string;
  buyer: string;
  completed: boolean;
  payment_intent: string;
  createdAt: string;
  updatedAt: string;
}
