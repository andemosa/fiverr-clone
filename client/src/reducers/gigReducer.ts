export interface IState {
  user: string;
  title: string;
  description: string;
  category: string;
  price: number;
  coverImage: string;
  images: string[];
  shortTitle: string;
  shortDescription: string;
  deliveryTime: number;
  revisionNumber: number;
  features: string[];
}

type ACTIONTYPE =
  | { type: "CHANGE_INPUT"; payload: { name: string; value: string | number } }
  | { type: "ADD_IMAGES"; payload: { cover: string; images: string[] } }
  | { type: "ADD_FEATURE"; payload: string }
  | { type: "REMOVE_FEATURE"; payload: string };

export const INITIAL_STATE: IState = {
  user: JSON.parse(localStorage.getItem("currentUser")!)?.user?._id,
  title: "",
  category: "",
  coverImage: "",
  images: [],
  description: "",
  shortTitle: "",
  shortDescription: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

export const gigReducer = (state: IState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        coverImage: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURE":
      if (state.features.includes(action.payload))
        return {
          ...state,
        };
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter(
          (feature: string) => feature !== action.payload
        ),
      };

    default:
      return state;
  }
};
