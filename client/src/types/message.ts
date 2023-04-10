export interface IConversation {
  id: string;
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
  lastMessage: string;
  readBySeller: boolean;
  readByBuyer: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  conversation: string;
  user: {
    _id: string;
    username: string;
    email: string;
    country: string;
    isSeller: boolean;
    avatar: string;
  };
  content: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessageResponse {
  messages: IMessage[];
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
}
