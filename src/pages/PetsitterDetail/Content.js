import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist';
import Review from './Review';

const Container = styled.div`
  width: 620px;
  // background-color: green;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  border-radius: 10px;
  padding: 20px;
`;

const ServiceItem = styled.div`
  // background-color: yellow;
  border: 1.5px solid gray;
  width: 150px;
  height: 45px;
  border-radius: 8px;
  margin-right: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
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
  // console.log(petsitterUserId);
  const navigate = useNavigate();

  const moveChatPage = () => {
    const temp = {
      createTime: new Date().toISOString(),
      otherId: petsitterUserId,
    };
    axios.post('https://withpet.site/chat/room', temp, { withCredentials: true })
      .then((res) => {
        // room id 저장
        // console.log(res.data.result);
        navigate(`../chat?roomId=${res.data.result.chatRoomId}`);
      });
  };

  // const reviews = [
  //   {
  //     id: 1,
  //     img: 'https://thumb.ac-illust.com/af/af39b2c67aed0b79b7e57070f41e180f_t.jpeg',
  //     name: '홍길동',
  //     content: '배추가 특별한 케이스라 돌봐주시는동안 잠도 제대로 못주무시고 많이 힘드셨을텐데 날씨 좋을때마다 산책도 다녀와주시고 밥도 잘 먹여주시고 넘 잘돌봐주셔서 일지확인하는내내 너무 감사했어요 !!! 덕분에 걱정을 좀 덜고 일정 잘 소화할수있었어요. 진짜 얼마나 감사한지 저는 말로 다 부족해요 ㅜㅠ 집에와서 코를 드르렁골면서 잘자고있어여 진짜 시터님 너무너무 감사했어요!!!!❤️❤️❤️',
  //     rate: 4.0,
  //     createdAt: '2023-04-05',
  //   },
  //   {
  //     id: 2,
  //     img: 'https://thumb.ac-illust.com/af/af39b2c67aed0b79b7e57070f41e180f_t.jpeg',
  //     name: '홍길동2',
  //     content: '배추가 특별한 케이스라 돌봐주시는동안 잠도 제대로 못주무시고 많이 힘드셨을텐데 날씨 좋을때마다 산책도 다녀와주시고 밥도 잘 먹여주시고 넘 잘돌봐주셔서 일지확인하는내내 너무 감사했어요 !!! 덕분에 걱정을 좀 덜고 일정 잘 소화할수있었어요. 진짜 얼마나 감사한지 저는 말로 다 부족해요 ㅜㅠ 집에와서 코를 드르렁골면서 잘자고있어여 진짜 시터님 너무너무 감사했어요!!!!❤️❤️❤️',
  //     rate: 3.0,
  //     createdAt: '2023-04-05',
  //   },
  //   {
  //     id: 3,
  //     img: 'https://thumb.ac-illust.com/af/af39b2c67aed0b79b7e57070f41e180f_t.jpeg',
  //     name: '홍길동3',
  //     content: '배추가 특별한 케이스라 돌봐주시는동안 잠도 제대로 못주무시고 많이 힘드셨을텐데 날씨 좋을때마다 산책도 다녀와주시고 밥도 잘 먹여주시고 넘 잘돌봐주셔서 일지확인하는내내 너무 감사했어요 !!! 덕분에 걱정을 좀 덜고 일정 잘 소화할수있었어요. 진짜 얼마나 감사한지 저는 말로 다 부족해요 ㅜㅠ 집에와서 코를 드르렁골면서 잘자고있어여 진짜 시터님 너무너무 감사했어요!!!!❤️❤️❤️',
  //     rate: 5.0,
  //     createdAt: '2023-04-05',
  //   },
  // ];
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
            <button onClick={moveChatPage}>문의하기</button>
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

        <div> { /* 펫시터 후기 */ }
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
