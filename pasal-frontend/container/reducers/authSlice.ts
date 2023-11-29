import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const verifyResponse = {
  permissions: ["all"],
  verified: true,
  firstName: null,
  lastName: null,
  country: null,
  spokenLanguage: [],
  about: null,
  profileImageLink: null,
  email: "bharatrose2@gmail.com",
  role: "admin",
  id: "651d3de1669cbc001892f2e6",
};

export type verifyType = typeof verifyResponse;

export interface VerifyReponseInterface {
  auth: verifyType | null;
}

export const initialState: VerifyReponseInterface = {
  auth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticatedUser: (
      state: VerifyReponseInterface,
      action: PayloadAction<verifyType>
    ) => {
      return {
        ...state,
        auth: action.payload,
      };
    },
  },
});

export const {authenticatedUser} = authSlice.actions;

export default authSlice.reducer;
