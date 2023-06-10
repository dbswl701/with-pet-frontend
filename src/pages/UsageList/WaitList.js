import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

function Item({ item }) {
  const [toggle, setToggle] = useState('simple');
  const simple = (
    <div style={{
      backgroundColor: '#FFFAF0', alignItems: 'center', justifyContent: 'center', margin: 'auto', marginBottom: '30px', width: '500px', height: '80px', display: 'flex', flexDirection: 'row', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
    }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {/* <img style={{ width: '70px', height: '70px' }} src={item.dog_img} alt="반려견 사진" /> */}
        <img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src="https://withpetoriginimage.s3.ap-northeast-1.amazonaws.com/02f71a84-7269-4319-8840-7a8a3fe9ea25.jpg" alt="반려견 사진" />
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
        <button style={{
          backgroundColor: '#E3D5C2', border: 'none', width: '60px', height: '20px',
        }}
        >
          <p style={{ fontSize: '6px', margin: '0px' }}>예약 취소</p>
        </button>
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
    // {
    //   name: '옵션',
    //   value: item.streetAdr,
    // },
  ];

  const detail = (
    <div style={{
      position: 'relative', backgroundColor: '#FFFAF0', alignItems: 'center', justifyContent: 'center', margin: 'auto', marginBottom: '30px', width: '500px', height: '400px', display: 'flex', flexDirection: 'column', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
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
        display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px', marginBottom: '80px',
      }}
      >
        {/* <img style={{ width: '70px', height: '70px' }} src={item.dog_img} alt="반려견 사진" /> */}
        <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src="https://withpetoriginimage.s3.ap-northeast-1.amazonaws.com/02f71a84-7269-4319-8840-7a8a3fe9ea25.jpg" alt="반려견 사진" />
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
          {item.reservationServiceResponses && item.reservationServiceResponses.map((service) => {
            return (
              <div>
                <p style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>옵션</p>
                <p style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>{service.serviceName} {service.price}</p>
                {/* <p style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>+</p> */}
              </div>
            );
          })}
        </div>
      </div>

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

function WaitList({ waitList }) {
  const steps = [
    '예약 대기',
    '예약 확정',
    '이용중',
    '이용 완료',
  ];

  return (
    <div style={{
      display: 'flex', alignItems: 'center', flexDirection: 'column',
    }}
    >
      <div style={{ width: '400px' }}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>

      { waitList && waitList.map((item) => {
        return <Item key={item.reservationId} item={item} />;
      })}
    </div>
  );
}

export default WaitList;
