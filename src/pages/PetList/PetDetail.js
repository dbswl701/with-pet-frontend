import React from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import heart from '../../assets/heart.png';
import social from '../../assets/social.png';

const Progress = styled.div`
  width: 148px;
  height: 10px;
  background-color: white;
  border: 2px solid gray;
  border-radius: 5px;
  margin: auto 10px;
`;

const Dealt = styled.div`
  background-color: red;
  // border: 2px solid gray;
  width: ${(props) => `${props.dealt}%`};
  height: 100%;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #CAA969;
  border: none;
  border-radius: 5px;
  margin-top : 10px;
  height: 30px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  cursor: pointer;
  color: white;
`;

function PetDetail({ pet, onToggle }) {
  // const [isModify, setIsModify] = useState(false);
  const navigate = useNavigate();
  const petSpec = [
    { name: '견종', value: pet.dog_breed },
    { name: '생일', value: pet.dog_birth },
    { name: '성별', value: pet.dog_gender },
    { name: '중성화 여부', value: pet.neutralization ? 'O' : 'X' },
    { name: '몸무게', value: pet.dog_weight },
    { name: '등록코드', value: pet.dog_isbn },
  ];
  const onClickSocilization = () => {
    navigate(`./userEvaluation/${pet.dog_id}`);
  };
  // console.log(pet);
  const detail = (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="pet-first">
          <div className="pet-img-group">
            <img className="pet-img" src={pet.dog_img} alt="반려견 프로필 사진" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={heart} alt="heart" style={{ width: '16px', height: '16px' }} />
                <Progress>
                  <Dealt dealt={pet.affectionTemperature} />
                </Progress>
                <p style={{ fontSize: '11px', margin: '0px', color: '#CAA969' }}>{pet.affectionTemperature}%</p>
              </div>
              <Button onClick={() => navigate('../calendar')}>애정도 올리러 가기</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={social} alt="social" style={{ width: '16px', height: '16px' }} />
                <Progress>
                  <Dealt dealt={pet.socializationDegree} />
                </Progress>
                <p style={{ fontSize: '11px', margin: '0px', color: '#CAA969' }}>{pet.socializationDegree}%</p>
              </div>
              <Button onClick={onClickSocilization}>반려견 사회성 등록</Button>
            </div>
          </div>
          <div className="pet-info">
            <div className="pet-name">
              <h2>{pet.dog_name}</h2>
            </div>
            <div className="pet-spec">
              <Grid container ml={2}>
                {petSpec.map((spec) => (
                  <React.Fragment key={spec.name}>
                    <Grid item xs={6}>
                      <Typography>{spec.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{spec.value}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </div>
            <button onClick={() => onToggle('modify')}>수정</button>
          </div>
        </div>
        <div className="pet-second">
          {/* <button onClick={onClickSocilization}>사회화</button> */}
          <button>건강수첩</button>
        </div>
      </div>
      <div>
        <ExpandCircleDownIcon className="up-icon" fontSize="large" onClick={() => onToggle('simple')} />
      </div>
    </>
  );

  return (
    <>
      { detail }
    </>
  );
}

export default PetDetail;
