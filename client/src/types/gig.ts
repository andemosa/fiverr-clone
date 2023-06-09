export interface IGig {
  _id: string;
  title: string;
  description: string;
  totalStars: number;
  starNumber: number;
  category: string;
  price: number;
  coverImage: string;
  images: string[];
  user: {
    _id: string;
    username: string;
    avatar: string;
    country: string;
    description: string;
    createdAt: string;
  };
  shortTitle: string;
  shortDescription: string;
  deliveryTime: number;
  revisionNumber: number;
  features: string[];
  sales: number;
  createdAt: string;
  updatedAt: string;
}
