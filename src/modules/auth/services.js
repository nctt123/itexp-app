import { baseApi } from '@common/baseApi';

export function signInWithEmailApi({ email, password }) {
  return baseApi.post('/auth/login', {
    email,
    password,
  });
}

export function signUpWithEmailApi({ name, email, password }) {
  return baseApi.post('/auth/register', {
    name,
    email,
    password,
  });
}

export function requestOTPApi({ email }) {
  return baseApi.post('/auth/send-otp', {
    email,
    type: 'RESET_PASSWORD',
  });
}

export function confirmOTPApi({ email, otp }) {
  return baseApi.post('/auth/verify-otp', {
    email,
    otp,
    type: 'RESET_PASSWORD',
  });
}

export function setPasswordApi({ otp, password, email }) {
  return baseApi.post('/auth/reset-password', {
    otp,
    password,
    email,
  });
}
