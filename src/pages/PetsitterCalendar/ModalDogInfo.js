import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  Dealt, Progress, IconImg, EvalContainer, BarContainer,
} from '../../styles/sidebar/SidebarStyle';
import social from '../../assets/social.png';
import heart from '../../assets/heart.png';

function ModalDogInfo({ open, setOpen, dogInfo }) {
  const list = [
    // {
    //   name: '기간',
    //   value: dogInfo.dogName,
    // },
    {
      name: '크기',
      value: dogInfo.criticalServiceName,
    },
    {
      name: '성별',
      value: dogInfo.dogGender,
    },
    {
      name: '품종',
      value: dogInfo.dogBreed,
    },
    {
      name: '옵션',
      value: dogInfo.dogName,
    },
    {
      name: '가격',
      value: `${dogInfo.totalCost} 원`,
    },
  ];

  const print = (
    <div className="diary_container">
      <img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src={dogInfo.dogProfileImg} alt="반려견 사진" />
      <p>{dogInfo.dogName} / {dogInfo.dogIsbn}</p>
      <BarContainer className="bar">
        <EvalContainer>
          <IconImg className="heart" src={heart} alt="heart" />
          <Progress className="heart">
            <Dealt className="heart" dealt={dogInfo.dogAffectionTemperature} />
          </Progress>
          <p className="heart">{dogInfo.dogAffectionTemperature}%</p>
        </EvalContainer>
        <EvalContainer>
          <IconImg className="social" src={social} alt="social" />
          <Progress className="social">
            <Dealt className="social" dealt={dogInfo.dogSocializationTemperature} />
          </Progress>
          <p className="social">{dogInfo.dogSocializationTemperature}%</p>
        </EvalContainer>
        <EvalContainer>
          <IconImg className="social" src={social} alt="social" />
          <Progress className="social">
            <Dealt className="social" dealt={dogInfo.dogSocializationDegree} />
          </Progress>
          <p className="social">{dogInfo.dogSocializationDegree}%</p>
        </EvalContainer>
      </BarContainer>
      <div style={{
        width: '350px', display: 'flex', flexDirection: 'row', justifyContent: 'center',
      }}
      >
        <div style={{
          width: '75px', backgroundColor: 'white', border: '1.5px solid #CAA969', borderRadius: '5px', marginRight: '30px',
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
    </div>
  );
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} style={{ margin: '40px' }}>
        <Box
          sx={{
            width: 350,
            height: 500,
            // maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 24,
            margin: 'auto',
            // overflowY: 'scroll',
            p: 2,
            backgroundColor: '#FAF6F0',
          }}
        >
          { print }
          <Button type="button" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalDogInfo;
