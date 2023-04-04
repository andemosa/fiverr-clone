export interface IReview {
  _id: string;
  gig: string;
  user: {
    _id: string;
    username: string;
    avatar?: string;
    country: string;
    createdAt: string;
  };
  star: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
