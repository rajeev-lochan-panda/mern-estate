import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IErrorState, IUserData, IResponse } from "../../../types/user";
import { defaultErrorData, defaultFormData } from "../../../constants/user";

interface UserState {
  currentUser: IUserData;
  error: IErrorState;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: defaultFormData,
  error: defaultErrorData,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<IResponse>) => {
      state.loading = false;
      state.currentUser = action.payload.data; // Extracts user data from response
      state.error = defaultErrorData;
    },
    signInFailure: (state, action: PayloadAction<IErrorState>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
