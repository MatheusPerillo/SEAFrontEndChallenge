import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IReduxUser {
  _id?: string;
  name: string;
  cpf: string;
  rg: string;
  gender: string;
  dateOfBirth: string;
  status: string;
  role: string;
  usesEPI: boolean;
  healthCertificate?: string;
  activities?: Array<{
    name?: string;
    EPIs?: Array<{
      name?: string;
      CA?: string;
    }>;
  }>;
}

interface UserState {
  users: IReduxUser[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IReduxUser>) => {
      return { ...state, users: [...state.users, action.payload] };
    },
    addUsers: (state, action: PayloadAction<IReduxUser[]>) => {
      return { ...state, users: [...state.users, ...action.payload] };
    },
    updateUser: (state, action: PayloadAction<IReduxUser>) => {
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    },
    setsUsers: (state, action: PayloadAction<IReduxUser[]>) => {
      return { ...state, users: action.payload };
    },
  },
});
