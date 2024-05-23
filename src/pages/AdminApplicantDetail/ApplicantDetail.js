/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
      alert('승인되었습니다.');
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancle = async () => {
    try {
      await postAdminApplicantRefuse(id);
      alert('거절되었습니다.');
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <S.Container>
      <S.Title>지원자 상세정보</S.Title>
      <S.UserInfoContainer>
        <S.ProfileImg src={info.applicantImg} alt="지원자 프로필 사진" />
        <S.SubContainer>
          <S.UserInfoSubContainer>
            <S.UserName>{info.applicantName}</S.UserName>
            <S.UserAddr>{info.applicantStreetAdr}</S.UserAddr>
          </S.UserInfoSubContainer>
          <S.SubContainer>
            <S.DescriptionSub>흡연 여부: {info.applicantIsSmoking ? 'O' : 'X'}</S.DescriptionSub>
          </S.SubContainer>
          <S.SubContainer>
            <S.DescriptionSub>강아지 반려 경험 유무: {info.applicantHavingWithPet ? 'O' : 'X'}</S.DescriptionSub>
          </S.SubContainer>
        </S.SubContainer>
      </S.UserInfoContainer>
      <S.SubContainer>
        <S.SubTItle>지원 동기</S.SubTItle>
        <S.DescriptionContent>{info.applicantMotivation}</S.DescriptionContent>
      </S.SubContainer>
      <S.SubContainer>
        <S.SubTItle>그 외 반려동물 관련 경력 또는 경험</S.SubTItle>
        <S.DescriptionContent>{info.applicantAnimalCareer}</S.DescriptionContent>
      </S.SubContainer>
      <S.SubContainer>
        <S.SubTItle>자격증</S.SubTItle>
        <S.LicenseImg src={info.applicantLicenseImg} alt="지원자 자격증 사진" />
      </S.SubContainer>
      <S.ButtonWrapper>
        <S.Button onClick={handleApprove} approve>승낙</S.Button>
        <S.Button onClick={handleCancle}>거절</S.Button>
      </S.ButtonWrapper>
      <S.BackButton onClick={() => navigate(-1)}>돌아가기</S.BackButton>
    </S.Container>
  );
}

export default ApplicantDetail;
