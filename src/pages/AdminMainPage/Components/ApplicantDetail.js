import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function ApplicantDetail() {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/show-applicant/${id}`, { withCredentials: true })
      .then((res) => {
        setInfo(res.data.result);
      });
  }, []);

  const handleApprove = () => {
    const temp = {
      userId: id,
    };

    axios.post('https://withpet.site/api/v1/admin/accept-petsitter', temp, { withCredentials: true })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('승인되었습니다.');
        navigate(-1);
      })
      .catch(() => {});
  };
  const handleCancle = (row) => {
    const temp = {
      userId: row.applicant_user_id,
    };
    axios.post('https://withpet.site/api/v1/admin/refuse-applicant', temp, { withCredentials: true })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('거절되었습니다.');
        navigate(-1);
      })
      .catch(() => {});
  };

  return (
    <div>
      <div style={{
        margin: '150px auto 150px auto', width: '1008px', padding: '30px', border: '1px solid #CAA969', borderRadius: '5px',
      }}
      >
        <p style={{ fontSize: '35px', fontWeight: 'bold' }}>지원자 상세정보</p>
        <div style={{
          display: 'flex', flexDirection: 'row', width: '600px', alignItems: 'center',
        }}
        >
          <div style={{ marginRight: '30px' }}>
            <img style={{ width: '76px', height: '76px', borderRadius: '50%' }} src={info.applicant_user_profileImg} alt="지원자 프로필 사진" />
          </div>
          <div>
            <div style={{
              display: 'flex', flexDirection: 'row', alignItems: 'center',
            }}
            >
              <p style={{ fontSize: '20px', margin: '0px', marginRight: '10px' }}><b>{info.applicant_user_name}</b></p>
              <p style={{
                fontSize: '16px', margin: '0px', color: '#999999', letterSpacing: '-0.05em',
              }}
              >{info.applicant_streetAdr}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '15px', color: '#7C7C7C', letterSpacing: '-0.05em' }}>흡연 여부: {info.applicant_is_smoking ? 'O' : 'X'}</p>
            </div>
            <div>
              <p style={{ fontSize: '15px', color: '#7C7C7C', letterSpacing: '-0.05em' }}>타인의 반려견을 돌봐준 경험: {info.applicant_having_with_pet ? 'O' : 'X'}</p>
            </div>
          </div>
        </div>
        <div>
          <p style={{ fontSize: '24px', margin: '30px 0px 16px 0px', fontWeight: 'bold' }}>자격증</p>
          <img style={{ height: '300px' }} src={info.applicant_license_img} alt="지원자 자격증 사진" />
        </div>
        <div>
          <p style={{ fontSize: '24px', margin: '30px 0px 16px 0px', fontWeight: 'bold' }}>지원 동기</p>
          <p style={{ fontSize: '14px', color: '#999999' }}>{info.applicant_motivate}</p>
        </div>
        <div>
          <p style={{ fontSize: '24px', margin: '30px 0px 16px 0px', fontWeight: 'bold' }}>펫시터 경력</p>
          <p style={{ fontSize: '14px', color: '#999999' }}>{info.applicant_petsitter_career}</p>
        </div>
        <div>
          <p style={{ fontSize: '24px', margin: '30px 0px 16px 0px', fontWeight: 'bold' }}>그 외 반려동물 관련 경력 또는 경험</p>
          <p style={{ fontSize: '14px', color: '#999999' }}>{info.applicant_animal_career}</p>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '30px',
        }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              style={{
                width: '100px', height: '40px', backgroundColor: '#CAA969', color: 'white', border: '1px solid white',
              }}
              onClick={handleApprove}
            >승낙
            </button>
            <button
              style={{
                width: '100px', height: '40px', backgroundColor: 'white', color: '#CAA969', border: '1px solid #CAA969',
              }}
              onClick={handleCancle}
            >거절
            </button>
          </div>
          <Button type="button" onClick={() => navigate(-1)}>
            <p style={{ fontSize: '20px' }}>돌아가기</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApplicantDetail;
