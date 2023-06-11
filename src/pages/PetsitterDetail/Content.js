import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist';
import Review from './Review';

const Container = styled.div`
  width: 620px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  border-radius: 10px;
  padding: 20px;
`;

const ServiceItem = styled.div`
  border: 1.5px solid gray;
  width: 180px;
  height: 45px;
  border-radius: 8px;
  margin-right: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
function Item({ service }) {
  return (
    <ServiceItem>
      <div style={{ width: '30px', height: '30px' }}>
        <img src={service.serviceImg} alt="사진" style={{ width: '30px', height: '30px' }} />
      </div>
      <div style={{ marginLeft: '10px' }}>
        <p style={{ fontSize: '13px', margin: '0px' }}>{service.serviceName} ({service.price}원)</p>
        <p style={{ fontSize: '11px', margin: '0px', color: 'gray' }}>{service.serviceIntroduction}</p>
      </div>
    </ServiceItem>
  );
}

function Content({ data, petsitterUserId, reviews }) {
  const navigate = useNavigate();

  const moveChatPage = () => {
    const temp = {
      createTime: new Date().toISOString(),
      otherId: petsitterUserId,
    };
    axios.post('https://withpet.site/chat/room', temp, { withCredentials: true })
      .then((res) => {
        navigate(`../chat?roomId=${res.data.result.chatRoomId}`);
      });
  };

  return (
    <>
      <Container>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ margin: 'auto 10px auto 0px' }}>
            <img src={data && data.petSitterProfileImg} alt="펫시터 프로필 사진" style={{ width: '90px', height: '90px', borderRadius: '50%' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ marginRight: '10px' }}>{data && data.petSitterName}</h2>
              <p>{data.petSitterAddress && data.petSitterAddress}</p>
            </div>

            {data.petSitterHashTags && data.petSitterHashTags.map((tag) => <span key={tag.petSitterHashTagId} style={{ color: '#CAA969' }}>#{tag.hashTagName}  </span>)}
          </div>
          <div>
            <button
              onClick={moveChatPage}
              style={{
                marginLeft: '30px', width: '110px', height: '45px', backgroundColor: 'white', color: '#CAA969', border: '1px solid #CAA969', borderRadius: '10px', cursor: 'pointer',
              }}
            >문의하기
            </button>
          </div>
        </div>

        <div>
          <h3 style={{ marginTop: '60px' }}>소개글</h3>
          <p>{data && data.introduction}</p>
        </div>

        <div>
          <h3 style={{ marginTop: '60px' }}>자격증</h3>
          <img src={data && data.petSitterLicenseImg} alt="자격증 사진" style={{ width: '310px', height: '220px' }} />
        </div>

        <div>
          <h3 style={{ marginTop: '60px' }}>이용 가능 서비스</h3>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.petSitterServices && data.petSitterServices.map((service) => <Item key={service.petSitterServiceId} service={service} />)}
          </div>
        </div>

        <div>
          <h3 style={{ marginTop: '60px' }}>펫시터 후기</h3>
          <div style={{
            display: 'flex', flexDirection: 'column', width: '580px',
          }}
          >
            { reviews && reviews.map((review) => <Review key={review.reviewId} review={review} />)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button style={{
              color: '#CAA969', width: '178px', height: '50px', backgroundColor: 'transparent', border: '1px solid #CAA969', borderRadius: '10px',
            }}
            >펫시터 후기 더보기
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Content;
