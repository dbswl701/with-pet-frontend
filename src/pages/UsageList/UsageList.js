import React from 'react';
// import axios from 'axios';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function Item({ item }) {
  const steps = [
    '예약 대기',
    '예약 확정',
    '이용중',
    '이용 완료',
  ];

  const statusSteps = [
    'wait',
    'confirm',
    'use',
    'done',
  ];

  return (
    <>
      <div style={{
        alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '1000px', height: '120px', display: 'flex', flexDirection: 'row', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
      }}
      >
        <div>
          <img style={{ width: '100px', height: '100px' }} src={item.dog_img} alt="반려견 사진" />
        </div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <p>{item.petsitter_name}</p>
            <p>{item.start_date} ~ {item.end_date}</p>
          </div>
          <div style={{ width: '400px' }}>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={statusSteps.indexOf(item.state)} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>

        </div>
        <div>
          <button>예약 취소</button>
        </div>
      </div>
    </>
  );
}

function UsageList() {
  const usageHistory = [
    {
      id: 1,
      state: 'wait',
      dog_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRulquOahMvWbXSqv2Bloml0ol2miJWhsV1Rw&usqp=CAU',
      petsitter_name: '펫시터1',
      start_date: '2023-03-28',
      end_date: '2023-03-30',
      cost: 10000,
      address: '경기도 팔달구 아주대',
      options: [
        {
          name: '산책',
          price: '1000',
        },
        {
          name: '미용',
          price: '1500',
        },
      ],
    },
    {
      id: 2,
      state: 'done',
      dog_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRulquOahMvWbXSqv2Bloml0ol2miJWhsV1Rw&usqp=CAU',
      petsitter_name: '펫시터2',
      start_date: '2023-03-29',
      end_date: '2023-03-31',
      cost: 20000,
      address: '경기도 팔달구 아주대',
      options: [
        {
          name: '산책',
          price: '1000',
        },
        {
          name: '미용',
          price: '1500',
        },
      ],
    },
  ];

  return (
    <>
      <div>반려인 이용내역 페이지</div>
      { usageHistory.map((item) => {
        return <Item key={item.id} item={item} />;
      }) }
    </>
  );
}

export default UsageList;
