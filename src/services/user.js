import axios from 'axios';
import baseUrl from './api';

// 펫시터 지원하기 폼 제출
const postPetsitterApplicants = (body) => {
  return axios.post(`${baseUrl}/v2/applicants`, body, { withCredentials: true });
};

export default postPetsitterApplicants;
