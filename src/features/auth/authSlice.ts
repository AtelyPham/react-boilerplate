import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, User } from '../../app/services/auth';
import type { RootState } from '../../app/store';

type AuthState = {
  user: User | null;
  token: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.me.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      },
    );
  },
});

export default slice.reducer;

export const { setToken } = slice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
