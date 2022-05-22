/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  signInWithEmailLoading: false,
  signInWithEmailError: '',
  signUpWithEmailLoading: false,
  signUpWithEmailError: '',
  requestOTPLoading: false,
  requestOTPError: '',
  confirmOTPLoading: false,
  confirmOTPError: '',
  setPasswordLoading: false,
  setPasswordError: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInWithEmail: state => {
      state.signInWithEmailLoading = true;
      state.signInWithEmailError = '';
    },
    signInWithEmailSucceeded: (state, action) => {
      state.signInWithEmailLoading = false;
      state.token = action.payload.data.token;
    },
    signInWithEmailFailed: (state, action) => {
      state.signInWithEmailLoading = false;
      state.signInWithEmailError = action.payload.errorMessage;
    },

    signInWithFacebook: (state, action) => {},
    signInWithFacebookSucceeded: (state, action) => {},
    signInWithFacebookFailed: (state, action) => {},

    signUpWithEmail: (state, action) => {
      state.signUpWithEmailLoading = true;
      state.signUpWithEmailError = '';
    },
    signUpWithEmailSucceeded: (state, action) => {
      state.signUpWithEmailLoading = false;
    },
    signUpWithEmailFailed: (state, action) => {
      state.signUpWithEmailLoading = false;
      state.signUpWithEmailError = action.payload.errorCode;
    },

    signOut: state => {
      state.token = '';
    },

    requestOtp: state => {
      state.requestOTPLoading = true;
      state.requestOTPError = '';
    },
    requestOtpSucceeded: state => {
      state.requestOTPLoading = false;
    },
    requestOtpFailed: (state, action) => {
      state.requestOTPLoading = false;
      state.requestOTPError = action.payload.errorCode;
    },

    confirmOtp: state => {
      state.confirmOTPLoading = true;
      state.requestOTPError = '';
    },
    confirmOtpSucceeded: state => {
      state.confirmOTPLoading = false;
    },
    confirmOtpFailed: (state, action) => {
      state.confirmOTPLoading = false;
      state.requestOTPError = action.payload.errorCode;
    },

    setPassword: state => {
      state.setPasswordLoading = true;
      state.setPasswordError = '';
    },
    setPasswordSucceeded: state => {
      state.setPasswordLoading = false;
    },
    setPasswordFailed: (state, action) => {
      state.setPasswordLoading = false;
      state.setPasswordError = action.payload.errorCode;
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  signInWithEmail,
  signInWithEmailSucceeded,
  signInWithEmailFailed,
  signInWithFacebook,
  signInWithFacebookSucceeded,
  signInWithFacebookFailed,
  signUpWithEmail,
  signUpWithEmailSucceeded,
  signUpWithEmailFailed,
  signOut,
  requestOtp,
  requestOtpSucceeded,
  requestOtpFailed,
  confirmOtp,
  confirmOtpSucceeded,
  confirmOtpFailed,
  setPassword,
  setPasswordSucceeded,
  setPasswordFailed,
} = actions;

export default reducer;
