import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
const mockUser = {
  permissions: ["654395ad65b43a0019b18e5f"],
  verified: true,
  firstName: "bharat",
  lastName: "shah",
  country: null,
  spokenLanguage: [],
  about: null,
  profileImageLink: null,
  email: "bharat5s@gmail.com",
  role: "admin",
  adminId: "6543978266461700a79c4b54",
  id: "6543a88c54acf302747895b2",
};

export type userType = typeof mockUser & {action?:ReactNode};

export interface UserResponseInterface {
  users: userType[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  update: string | null;
  affectedRows: number;
  filters: any; //{[x:string]:string[]};
  addedUser: userType | null;
}

export const initialState: UserResponseInterface = {
  users: [],
  loading: false,
  error: null,
  page: 0,
  limit: 20,
  update: null,
  affectedRows: 0,
  filters: { },
  addedUser:null
};

export const productSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsers: (
      state: UserResponseInterface,
      action: PayloadAction<userType[]>
    ) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    fetchingUsers: (
      state: UserResponseInterface,
      action: PayloadAction<boolean>
    ) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    fetchedError: (
      state: UserResponseInterface,
      action: PayloadAction<string | null>
    ) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    paginateUser: (
      state: UserResponseInterface,
      action: PayloadAction<number>
    ) => {
      return {
        ...state,
        page: action.payload,
      };
    },
    addUser: (state: UserResponseInterface, action: PayloadAction<userType>) => {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    },
    updateUser: (
      state: UserResponseInterface,
      action: PayloadAction<string | null>
    ) => {
      return {
        ...state,
        update: action.payload,
      };
    },
    affectedRowAction: (
      state: UserResponseInterface,
      action: PayloadAction<number>
    ) => {
      return {
        ...state,
        affectedRows: action.payload,
      };
    },
    filterUser: (
      state: UserResponseInterface,
      action: PayloadAction<{ [x: string]: string[] }>
    ) => {
      return {
        ...state,
        filters: action.payload,
      };
    },
    addedUserAction: (
      state: UserResponseInterface,
      action: PayloadAction<userType | null >
    ) => {
      return {
        ...state,
        addedUser: action.payload,
      };
    },
   
  },
});

export const {
  fetchUsers,
  fetchingUsers,
  fetchedError,
  paginateUser,
  addUser,
  updateUser,
  affectedRowAction,
  filterUser,
  addedUserAction
} = productSlice.actions;

export const productActions = productSlice.actions;

export default productSlice.reducer;
