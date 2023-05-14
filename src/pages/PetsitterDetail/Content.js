import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 580px;
  background-color: green;
`;

const ServiceItem = styled.div`
  background-color: yellow;
`;
function Item({ service }) {
  return (
    <ServiceItem>
      <img src={service.img} alt="사진" />
      <p>{service.name}</p>
      <p>{service.content}</p>
      <p>{service.price}원</p>
    </ServiceItem>
  );
}

function Content({ data }) {
  return (
    <>
      <Container>
        <div style={{ display: 'flex', flexDirection: 'row' }}> { /* 맨 위에 펫시터 정보 */ }
          <div>
            <img src={data && data.profileImg} alt="펫시터 프로필 사진" />
          </div>
          <div>
            <p>{data && data.name}</p>
            <p>{data.petSitterAddress && data.petSitterAddress.streetAdr}</p>
            {data.petSitterHashTags && data.petSitterHashTags.map((tag) => <p key={tag.petSitterHashTagId}>#{tag.hashTagName}</p>)}
          </div>
        </div>

        <div> { /* 소개글 */ }
          <p>소개글</p>
          <p>{data && data.introduction}</p>
        </div>

        <div> { /* 자격증 */ }
          <p>자격증</p>
          <img src={data && data.petSitterLicenseImg} alt="자격증 사진" />
        </div>

        <div> { /* 이용 가능 서비스 */ }
          <p>이용 가능 서비스</p>
          {data.petSitterServices && data.petSitterServices.map((service) => <Item key={service.petSitterServiceId} service={service} />)}
        </div>
      </Container>
    </>
  );
}

export default Content;
