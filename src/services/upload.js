import axios from 'axios';
import baseUrl from './api';

const PostFileUpload = (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.post(`${baseUrl}/v1/file/upload`, formData, config);
};

export default PostFileUpload;
