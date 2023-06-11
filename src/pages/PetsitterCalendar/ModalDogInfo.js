import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import {
  Dealt, Progress, IconImg, EvalContainer, BarContainer,
} from '../../styles/sidebar/SidebarStyle';
import social from '../../assets/social.png';
import heart from '../../assets/heart.png';

function ModalDogInfo({ open, setOpen, dogInfo }) {
  const list = [
    {
      name: '반려견',
      value: dogInfo.dogName,
    },
    {
      name: '체크인',
      value: dayjs(dogInfo.checkIn).format('YYYY-MM-DD hh:mm'),
    },
    {
      name: '체크아웃',
      value: dayjs(dogInfo.checkOut).format('YYYY-MM-DD hh:mm'),
    },
    {
      name: '선택한 서비스',
      value: '데이 케어',
    },
  ];

  const print = (
    <div>
      <div>
        <div>
          <p style={{ fontSize: '20px', color: '#333333', fontWeight: 'bold' }}>{dogInfo.userName}님의 반려견</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img
            style={{
              width: '52px', height: '52px', borderRadius: '50%', marginRight: '8px',
            }}
            src={dogInfo.dogProfileImg}
            alt="반려견 사진"
          />
          <BarContainer className="bar">
            <EvalContainer style={{ padding: '0px' }}>
              <IconImg className="heart" src={heart} alt="heart" />
              <Progress className="heart" style={{ marginLeft: '0px' }}>
                <Dealt className="heart" dealt={dogInfo.dogAffectionTemperature} />
              </Progress>
              <p className="heart">{dogInfo.dogAffectionTemperature}%</p>
            </EvalContainer>
            <EvalContainer style={{ padding: '0px' }}>
              <IconImg className="social" src={social} alt="social" />
              <Progress className="social">
                <Dealt className="social" dealt={dogInfo.dogSocializationTemperature} />
              </Progress>
              <p className="social">{dogInfo.dogSocializationTemperature}%</p>
            </EvalContainer>
            <EvalContainer style={{ padding: '0px' }}>
              <IconImg className="socialUser" src={social} alt="social" />
              <Progress className="socialUser" style={{ marginLeft: '0px', color: '#64C8F3' }}>
                <Dealt className="socialUser" dealt={dogInfo.dogSocializationDegree} style={{ backgroundColor: '#64C8F3' }} />
              </Progress>
              <p className="social" style={{ marginLeft: '0px', color: '#64C8F3' }}>{dogInfo.dogSocializationDegree}%</p>
            </EvalContainer>
          </BarContainer>
        </div>
        <div>
          <p style={{
            color: '#747474', fontSize: '15px', fontStyle: 'normal', letterSpacing: '-0.05em', fontWeight: 'bold', marginTop: '8px',
          }}
          >{dogInfo.dogName} ({dogInfo.dogGender === 'male' ? '남' : '여'}) {dogInfo.dogBreed} {dogInfo.dogWeight}kg {dogInfo.criticalServiceName} 중성화 {dogInfo.dogNeutralization === 'true' ? 'O' : 'X'}
          </p>
        </div>
      </div>
      <div style={{
        border: '1px solid #CAA969', borderRadius: '5px', width: '440px', padding: '10px',
      }}
      >
        <div style={{
          border: '1px solid #999999', borderRadius: '5px', width: '420px', marginBottom: '10px',
        }}
        >
          <div style={{ borderBottom: '1px solid #999999' }}>
            <p style={{ fontSize: '18px', margin: '10px', fontWeight: 'bold' }}>예약 정보 확인</p>
          </div>
          <div style={{ width: '400px', padding: '10px' }}>
            <Grid container>
              {list.map((spec) => (
                <React.Fragment key={spec.name}>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#999999', fontWeight: 'bold', margin: '10px' }}>{spec.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{
                      float: 'right', color: '#999999', fontWeight: 'bold', margin: '10px',
                    }}
                    >{spec.value}
                    </Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </div>
        </div>
        <div style={{
          border: '1px solid #999999', borderRadius: '5px', width: '420px',
        }}
        >
          <div style={{ borderBottom: '1px solid #999999' }}>
            <p style={{ fontSize: '18px', margin: '10px', fontWeight: 'bold' }}>최종 결제 금액</p>
          </div>
          <div style={{ width: '400px', padding: '10px' }}>
            <Grid container>
              <Grid item xs={6}>
                <Typography style={{ color: '#999999', fontWeight: 'bold', margin: '10px' }}>필수 선택 옵션</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography style={{
                  float: 'right', color: '#999999', fontWeight: 'bold', margin: '10px',
                }}
                >{dogInfo.criticalServiceName} {dogInfo.criticalServicePrice}원
                </Typography>
              </Grid>
            </Grid>
            <div style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1px solid black',
            }}
            >
              <div>
                <Typography style={{ color: '#999999', fontWeight: 'bold', margin: '10px' }}>선택 옵션</Typography>
              </div>
              <div>
                {dogInfo.reservationServiceResponses && dogInfo.reservationServiceResponses.map((item) => {
                  return (
                    <div key={item.serviceName}>
                      <Typography
                        style={{
                          color: '#999999', fontWeight: 'bold', margin: '10px', float: 'right',
                        }}
                      >{item.serviceName} {item.price}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <Grid container>
                <Grid item xs={6}>
                  <Typography style={{
                    fontSize: '18px', color: 'black', fontWeight: 'bold', margin: '10px',
                  }}
                  >총 결제 금액
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography style={{
                    fontSize: '18px', float: 'right', color: '#999999', fontWeight: 'bold', margin: '10px',
                  }}
                  >{dogInfo.totalCost} 원
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => setOpen(false)}
          style={{
            borderRadius: '7px', width: '94px', height: '25px', backgroundColor: '#CAA969', color: 'white', border: '1px solid #CAA969', margin: '11px auto 25px auto',
          }}
        >닫기
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} style={{ margin: '40px' }}>
        <Box
          sx={{
            width: 550,
            borderRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 24,
            margin: 'auto',
            p: 2,
            backgroundColor: '#FAF6F0',
          }}
        >
          { print }
        </Box>
      </Modal>
    </div>
  );
}

export default ModalDogInfo;
