// userReducer.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../server/src/models/user";

interface UserState {
  users: IUser[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      return { ...state, users: [...state.users, action.payload] };
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
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
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      return { ...state, users: action.payload };
    },
  },
});
