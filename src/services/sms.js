import axios from 'axios';
import baseUrl from './api';

// 휴대폰, 인증번호
const getReissuance = async (phone) => {
  try {
    const res = await axios.get(`${baseUrl}/v2/sms-authentication?to=${phone}`);
    return res.data.result;
  } catch (err) {
    console.error('전화번호 인증 번호 발급 실패', err);
    if (err.response && err.response.status === 409) {
      alert(err.response.data.message);
    }
    throw err;
  }
};

export default getReissuance;
