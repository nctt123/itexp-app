import { createSelector } from 'reselect';

const uploadFileSelector = state => state.account;

export const preUploadFileUrlSelector = createSelector(
  uploadFileSelector,
  uploadFileSelector => uploadFileSelector.preUploadFile,
);
