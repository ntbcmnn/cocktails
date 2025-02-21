export interface IUser {
  _id: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
  avatar: string | null;
  email: string;
}

export interface Ingredients {
  name: string;
  amount: string;
}

export interface ICocktail {
  _id: string;
  user: IUser;
  name: string;
  image: File | null;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredients[];
}

export interface ICocktailMutation {
  name: string;
  image: File | null;
  recipe: string;
  ingredients: Ingredients[];
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface RegisterMutation {
  email: string;
  avatar: File | null;
  displayName: string;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
