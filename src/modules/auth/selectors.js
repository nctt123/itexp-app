import { createSelector } from 'reselect';

const authSelector = state => state.auth;

export const tokenSelector = createSelector(
  authSelector,
  authReducer => authReducer.token,
);

export const signInWithEmailLoadingSelector = createSelector(
  authSelector,
  authReducer => authReducer.signInWithEmailLoading,
);
export const signInWithEmailErrorSelector = createSelector(
  authSelector,
  authReducer => authReducer.signInWithEmailError,
);

export const signUpWithEmailLoadingSelector = createSelector(
  authSelector,
  authReducer => authReducer.signUpWithEmailLoading,
);
export const signUPWithEmailErrorSelector = createSelector(
  authSelector,
  authReducer => authReducer.signUpWithEmailError,
);

export const requestOTPLoadingSelector = createSelector(
  authSelector,
  authReducer => authReducer.requestOTPLoading,
);
export const requestOTPErrorgSelector = createSelector(
  authSelector,
  authReducer => authReducer.requestOTPError,
);

export const confirmOTPLoadingSelector = createSelector(
  authSelector,
  authReducer => authReducer.confirmOTPLoading,
);
export const confirmOTPErrorgSelector = createSelector(
  authSelector,
  authReducer => authReducer.confirmOTPError,
);

export const setPasswordLoadingSelector = createSelector(
  authSelector,
  authReducer => authReducer.setPasswordLoading,
);
export const setPasswordErrorgSelector = createSelector(
  authSelector,
  authReducer => authReducer.setPasswordError,
);
