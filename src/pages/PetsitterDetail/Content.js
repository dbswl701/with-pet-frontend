import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 580px;
  background-color: green;
`;

const ServiceItem = styled.div`
  background-color: yellow;
  width: 200px;
  border-radius: 8px;
  margin-right: 10px;
`;
function Item({ service }) {
  return (
    <ServiceItem>
      <img src={service.serviceImg} alt="사진" />
      <p>{service.serviceName}</p>
      <p>{service.serviceIntro}</p>
      <p>{service.price}원</p>
    </ServiceItem>
  );
}

function Content({ data }) {
  // console.log(data.);
  return (
    <>
      <Container>
        <div style={{ display: 'flex', flexDirection: 'row' }}> { /* 맨 위에 펫시터 정보 */ }
          <div style={{ margin: 'auto 10px auto 0px' }}>
            <img src={data && data.petSitterLicenseImg} alt="펫시터 프로필 사진" style={{ width: '90px', height: '90px' }} />
          </div>
          <div>
            <p>{data && data.petSitterName}</p>
            <p>{data.petSitterAddress && data.petSitterAddress}</p>
            {data.petSitterHashTags && data.petSitterHashTags.map((tag) => <p key={tag.petSitterHashTagId}>#{tag.hashTagName}</p>)}
          </div>
        </div>

        <div> { /* 소개글 */ }
          <p>소개글</p>
          <p>{data && data.introduction}</p>
        </div>

        <div> { /* 자격증 */ }
          <p>자격증</p>
          <img src={data && data.petSitterLicenseImg} alt="자격증 사진" style={{ width: '310px', height: '220px' }} />
        </div>

        <div> { /* 이용 가능 서비스 */ }
          <p>이용 가능 서비스</p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {data.petSitterServices && data.petSitterServices.map((service) => <Item key={service.petSitterServiceId} service={service} />)}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Content;
