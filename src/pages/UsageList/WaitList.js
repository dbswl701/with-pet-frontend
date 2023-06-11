import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import dayjs from 'dayjs';
import paymentIconYellowMedium from '../../assets/paymentIconYellowMedium.png';

function Item({
  item, handleCancel, stepValue, handleDone, handleReview, onPaying,
}) {
  const [toggle, setToggle] = useState('simple');
  const [reviewToggle, setReviewToggle] = useState(false);
  const [reviewContent, setReviewContent] = useState({
    rate: 0,
    content: '',
  });
  let printButton = (
    <button
      onClick={() => handleCancel(item.reservationId)}
      style={{
        backgroundColor: '#E3D5C2', border: 'none', width: '60px', height: '20px',
      }}
    >
      <p style={{ fontSize: '6px', margin: '0px', cursor: 'pointer' }}>예약 취소</p>
    </button>
  );

  if (stepValue === '4') {
    printButton = (
      <button
        onClick={() => handleDone(item.reservationId)}
        style={{
          backgroundColor: '#E3D5C2', border: 'none', width: '60px', height: '20px',
        }}
      >
        <p style={{ fontSize: '6px', margin: '0px', cursor: 'pointer' }}>이용완료</p>
      </button>
    );
  } else if (stepValue === '5') {
    printButton = (
      <button
        onClick={() => {
          setReviewToggle(true);
          setToggle('detail');
        }}
        style={{
          backgroundColor: '#E3D5C2', border: 'none', width: '60px', height: '20px',
        }}
        disabled={reviewContent.content !== ''}
      >
        <p style={{ fontSize: '6px', margin: '0px', cursor: 'pointer' }}>후기작성</p>
      </button>
    );
  }

  const simple = (
    <div style={{
      backgroundColor: '#FFFAF0', alignItems: 'center', justifyContent: 'center', margin: 'auto', marginBottom: '30px', width: '500px', height: '80px', display: 'flex', flexDirection: 'row', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
    }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {/* <img style={{ width: '70px', height: '70px' }} src={item.dog_img} alt="반려견 사진" /> */}
        <img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src={item.dogImg} alt="반려견 사진" />
        <p>{item.petSitterName}</p>
      </div>
      <div>
        <div style={{
          display: 'flex', flexDirection: 'row', width: '200px', justifyContent: 'space-around',
        }}
        >
          <p>{item.checkIn.split('T')[0]} ~ {item.checkOut.split('T')[0]}</p>
        </div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
      }}
      >
        {printButton}
        <ChevronLeftOutlinedIcon style={{ transform: 'rotate( -90deg )', color: 'rgb(181, 181, 181)' }} fontSize="large" onClick={() => setToggle('detail')} />
      </div>
    </div>
  );

  const list = [
    {
      name: '펫시터',
      value: item.petSitterName,
    },
    {
      name: '기간',
      value: `${item.checkIn.split('T')[0]} ~ ${item.checkOut.split('T')[0]}`,
    },
    {
      name: '체크인',
      value: `${dayjs((item.checkIn)).format('hh시')}`,
    },
    {
      name: '체크아웃',
      value: `${dayjs(item.checkOut).format('hh시')}`,
    },
    {
      name: '주소',
      value: item.streetAdr,
    },
    {
      name: '총 비용',
      value: `${item.totalCost} 원`,
    },
  ];

  const handleLocalReview = () => {
    handleReview(item.reservationId, reviewContent);
    setReviewToggle(false);
    // setReviewContent({
    //   rate: 0,
    //   content: '',
    // });
  };

  const paying = (
    <div>
      <button style={{ backgroundColor: 'transparent', border: 'none' }}>
        <img src={paymentIconYellowMedium} alt="대체 텍스트" onClick={() => onPaying(item.reservationId)} />
      </button>
      <p>결제 다시 진행하기</p>
    </div>
  );

  const reviewBody = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <Rating
        value={reviewContent.rate}
        onChange={(event, newValue) => {
          setReviewContent({ ...reviewContent, rate: newValue });
        }}
        precision={0.5}
        style={{ marginLeft: '10px', marginTop: '20px' }}
      />
      <textarea
        style={{
          width: '400px', border: '1.5px solid #CAA969', resize: 'none', margin: '10px', outline: 'none', borderRadius: '5px',
        }}
        rows="3"
        value={reviewContent.content}
        onChange={(e) => setReviewContent({ ...reviewContent, content: e.target.value })}
      />
      {/* <textarea value={reviewContent.content} onChange={(e) => setReviewContent({ ...reviewContent, content: e.target.value })} /> */}
      <button
        style={{
          backgroundColor: '#E3D5C2', width: '200px', border: 'none', margin: 'auto', marginBottom: '20px', marginTop: '20px', cursor: 'pointer',
        }}
        onClick={handleLocalReview}
      >제출
      </button>
    </div>
  );
  // console.log(reviewContent);
  const detail = (
    <div style={{
      position: 'relative', backgroundColor: '#FFFAF0', alignItems: 'center', justifyContent: 'center', margin: 'auto', paddingBottom: '30px', marginBottom: '30px', width: '500px', display: 'flex', flexDirection: 'column', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
    }}
    >
      <ChevronLeftOutlinedIcon
        style={{
          transform: 'rotate( 90deg )', color: 'rgb(181, 181, 181)', position: 'absolute', right: '35px', top: '25px',
        }}
        fontSize="large"
        onClick={() => setToggle('simple')}
      />
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginBottom: '50px',
      }}
      >
        {/* <img style={{ width: '70px', height: '70px' }} src={item.dog_img} alt="반려견 사진" /> */}
        <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={item.dogImg} alt="반려견 사진" />
        <p><b>{item.dogName}</b></p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{
          width: '350px', display: 'flex', flexDirection: 'row',
        }}
        >
          <div style={{
            width: '75px', backgroundColor: 'white', border: '1.5px solid #CAA969', borderRadius: '5px',
          }}
          >
            {list.map((spec) => (
              <React.Fragment key={spec.name}>
                <p style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>{spec.name}</p>
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginLeft: '20px' }}>
            {list.map((spec) => (
              <React.Fragment key={spec.name}>
                <p style={{ fontSize: '13px', fontWeight: 'bolder' }}>{spec.value}</p>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{
          backgroundColor: 'white', border: '1.5px solid #CAA969', width: '80px', borderRadius: '5px',
        }}
        >
          <p style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>옵션</p>
          {item.reservationServiceResponses && item.reservationServiceResponses.map((service) => {
            return (
              <div key={service.serviceName}>
                <p style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>{service.serviceName} {service.price}</p>
                {/* <p style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>+</p> */}
              </div>
            );
          })}
        </div>
      </div>
      { stepValue === '1' && paying }
      { reviewToggle && reviewBody}

    </div>
  );

  let print = simple;
  if (toggle === 'simple') {
    print = simple;
  } else if (toggle === 'detail') {
    print = detail;
  }
  return (
    <>
      { print }
    </>
  );
}

function WaitList({
  list, handleCancel, stepValue, handleDone, handleReview, onPaying,
}) {
  // console.log(stepValue);
  const steps = [
    '결제 대기',
    '예약 대기',
    '예약 확정',
    '이용중',
    '이용 완료',
  ];

  const stepInfo = [
    '결제가 되어야 펫시터가 수락할 수 있습니다.',
    '결제가 완료되었고 펫시터의 수락을 기다리고 있습니다.',
    '예약이 확정되었습니다.',
    '펫시터가 돌봄을 하고 있습니다.',
    '후기를 작성해주세요',
  ];

  return (
    <div style={{
      display: 'flex', alignItems: 'center', flexDirection: 'column',
    }}
    >
      <div style={{ width: '400px', marginTop: '30px' }}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={stepValue} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <p style={{ fontSize: '11px', color: 'gray' }}>{stepInfo[stepValue - 1]}</p>
      { list && list.map((item) => {
        return <Item key={item.reservationId} item={item} handleCancel={handleCancel} stepValue={stepValue} handleDone={handleDone} handleReview={handleReview} onPaying={onPaying} />;
      })}
      { list.length === 0 && (
        <div style={{
          backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', margin: 'auto', marginBottom: '30px', width: '500px', height: '80px', display: 'flex', flexDirection: 'row', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
        }}
        >
          <p style={{ color: 'gray' }}>비어있습니다</p>
        </div>
      )}
    </div>
  );
}

export default WaitList;
