/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  preUploadFileLoading: false,
};

const accountSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    preUploadFile: state => {
      state.preUploadFileLoading = true;
    },
    preUploadFileSuccessed: state => {
      state.preUploadFileLoading = false;
    },
    preUploadFileFailed: state => {
      state.preUploadFileLoading = false;
    },
  },
});

const { actions, reducer } = accountSlice;

export const {
  preUploadFile,
  preUploadFileSuccessed,
  preUploadFileFailed,
} = actions;

export default reducer;
