import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 620px;
  // background-color: green;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  border-radius: 10px;
  padding: 20px;
`;

const ServiceItem = styled.div`
  // background-color: yellow;
  border: 1px solid gray;
  width: 200px;
  border-radius: 8px;
  margin-right: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
`;
function Item({ service }) {
  return (
    <ServiceItem>
      <img src={service.serviceImg} alt="사진" style={{ width: '40px', height: '40px' }} />
      <p>{service.serviceName}</p>
      <p>{service.serviceIntroduction}</p>
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
            <img src={data && data.petSitterProfileImg} alt="펫시터 프로필 사진" style={{ width: '90px', height: '90px' }} />
          </div>
          <div>
            <p>{data.petSitterAddress && data.petSitterAddress}</p>
            <h2 style={{ marginBottom: '10px' }}>{data && data.petSitterName}</h2>
            {data.petSitterHashTags && data.petSitterHashTags.map((tag) => <span key={tag.petSitterHashTagId}>#{tag.hashTagName}  </span>)}
          </div>
        </div>

        <div> { /* 소개글 */ }
          <h3 style={{ marginTop: '60px' }}>소개글</h3>
          <p>{data && data.introduction}</p>
        </div>

        <div> { /* 자격증 */ }
          <h3 style={{ marginTop: '60px' }}>자격증</h3>
          <img src={data && data.petSitterLicenseImg} alt="자격증 사진" style={{ width: '310px', height: '220px' }} />
        </div>

        <div> { /* 이용 가능 서비스 */ }
          <h3 style={{ marginTop: '60px' }}>이용 가능 서비스</h3>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {data.petSitterServices && data.petSitterServices.map((service) => <Item key={service.petSitterServiceId} service={service} />)}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Content;
