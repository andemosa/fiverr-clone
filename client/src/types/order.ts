export interface IOrder {
  _id: string;
  gig: string;
  image: string;
  title: string;
  price: number;
  seller: {
    _id: string;
    username: string;
    avatar: string;
    country: string;
    description: string;
    createdAt: string;
  };
  buyer: {
    _id: string;
    username: string;
    avatar: string;
    country: string;
    description: string;
    createdAt: string;
  };
  completed: boolean;
  payment_intent: string;
  createdAt: string;
  updatedAt: string;
}
