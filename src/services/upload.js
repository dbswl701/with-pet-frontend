import axios from 'axios';

const PostFileUpload = (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.post('https://withpet.site/api/v1/file/upload', formData, config);
};

export default PostFileUpload;
