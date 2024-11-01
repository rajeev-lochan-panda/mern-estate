import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IErrorState, IFormData } from "../../../types/user";
import { defaultErrorData, defaultFormData } from "../../../constants/user";

interface UserState {
  currentUser: IFormData;
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
    signInSuccess: (state, action: PayloadAction<IFormData>) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = defaultErrorData;
    },
    signInFailure: (state, action: PayloadAction<IErrorState>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // setUser: (state, action: PayloadAction<IFormData>) => {
    //   state.currentUser = action.payload;
    // },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
