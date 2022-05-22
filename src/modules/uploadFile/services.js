import { baseApi } from '@common/baseApi';

export function preUploadFileApi({ type, name }) {
  return baseApi.post('/file/presign-url', {
    type,
    name,
  });
}
