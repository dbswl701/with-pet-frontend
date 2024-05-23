import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { getAdminApplicantDetail, postAdminApplicantApprove, postAdminApplicantRefuse } from '../../services/admin';
import * as S from './ApplicantDetail.styles';

function ApplicantDetail() {
  const { id } = useParams();
  console.log('id:', id);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAdminApplicantDetail(id);
      setInfo(res.data.result);
    };
    fetchData();
  }, []);

  const handleApprove = async () => {
    try {
      await postAdminApplicantApprove(id);
      // eslint-disable-next-line no-alert
      alert('승인되었습니다.');
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCancle = async () => {
    try {
      await postAdminApplicantRefuse(id);
      // eslint-disable-next-line no-alert
      alert('거절되었습니다.');
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <S.Container>
      <S.Title>지원자 상세정보</S.Title>
      <div style={{
        display: 'flex', flexDirection: 'row', width: '600px', alignItems: 'center',
      }}
      >
        <div style={{ marginRight: '30px' }}>
          <img style={{ width: '76px', height: '76px', borderRadius: '50%' }} src={info.applicantImg} alt="지원자 프로필 사진" />
        </div>
        <div>
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center',
          }}
          >
            <p style={{ fontSize: '20px', margin: '0px', marginRight: '10px' }}><b>{info.applicantName}</b></p>
            <p style={{
              fontSize: '16px', margin: '0px', color: '#999999', letterSpacing: '-0.05em',
            }}
            >{info.applicantStreetAdr}
            </p>
          </div>
          <div>
            <S.DescriptionSub>흡연 여부: {info.applicantIsSmoking ? 'O' : 'X'}</S.DescriptionSub>
          </div>
          <div>
            <S.DescriptionSub>강아지 반려 경험 유무: {info.applicantHavingWithPet ? 'O' : 'X'}</S.DescriptionSub>
          </div>
        </div>
      </div>
      <div>
        <S.SubTItle>지원 동기</S.SubTItle>
        <p style={{ fontSize: '14px', color: '#999999' }}>{info.applicantMotivation}</p>
      </div>
      <div>
        <S.SubTItle>그 외 반려동물 관련 경력 또는 경험</S.SubTItle>
        <p style={{ fontSize: '14px', color: '#999999' }}>{info.applicantAnimalCareer}</p>
      </div>
      <div>
        <S.SubTItle>자격증</S.SubTItle>
        <img style={{ height: '300px' }} src={info.applicantLicenseImg} alt="지원자 자격증 사진" />
      </div>
      <div style={{
        display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '30px',
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <S.Button
            onClick={handleApprove}
            approve
          >승낙
          </S.Button>
          <S.Button
            onClick={handleCancle}
          >거절
          </S.Button>
        </div>
        <Button type="button" onClick={() => navigate(-1)}>
          <p style={{ fontSize: '20px' }}>돌아가기</p>
        </Button>
      </div>
    </S.Container>
  );
}

export default ApplicantDetail;
