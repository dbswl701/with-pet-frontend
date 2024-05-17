import React, { useState } from 'react';
import * as S from './PetsitterApply2.styles';
import RadioButton from '../../components/RadioButton/RadioButton';

function PetsitterApply2() {
  const [info, setInfo] = useState({
    applicantAnimalCareer: '',
    applicantBirth: '',
    applicantGender: '',
    applicantHavingWithPet: '',
    applicantIsSmoking: '',
    applicantLicenseImg: '',
    applicantMotivation: '',
  });
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log('value:', value, 'name:', name);
    setInfo({
      ...info,
      [name]: value,
    });
  };
  console.log('info:', info);
  return (
    <S.Wrapper>
      <S.SubTitle>1. 기본 정보</S.SubTitle>
      <S.Container>
        <div>
          <p>1. 생년월일</p>
          <S.BirthInput placeholder="ex) 930101" />
          <S.Description>05년생부터(만 18세 이상) 펫시터 지원이 가능합니다. </S.Description>
        </div>
        <div>
          <p>2. 흡연 여부</p>
          <RadioButton onChange={onChange} name="applicantIsSmoking" checked={info.applicantIsSmoking} first="흡연" second="비흡연" />
          <S.Description>직업 특성상 흡연을 하시는 경우, 펫시터 활동이 어려울 수 있습니다.</S.Description>
        </div>
        <div>
          <p>3. 성별</p>
          <RadioButton onChange={onChange} name="applicantGender" checked={info.applicantGender} first="여성" second="남성" />
        </div>
      </S.Container>
      <S.SubTitle>2. 반려 경험 및 경력</S.SubTitle>
      <S.Container>
        <div>
          <p>1. 강아지 반려 경험 유무</p>
          <RadioButton onChange={onChange} name="applicantHavingWithPet" checked={info.applicantHavingWithPet} first="O" second="X" />
        </div>
        <div>
          <p>2. 반려 동물 관련 경력 또는 경험</p>
          <S.TextArea placeholder="반려 동물 관련 경력 또는 경험에 대해서 알려주세요." />
        </div>
      </S.Container>
      <S.SubTitle>3. 기타 정보</S.SubTitle>
      <S.Container>
        <div>
          <p>1. 지원 동기</p>
          <S.TextArea placeholder="지원 동기에 대해 작성해주세요." />
        </div>
        <div>
          <p>2. 자격증</p>
        </div>
      </S.Container>
    </S.Wrapper>
  );
}

export default PetsitterApply2;
