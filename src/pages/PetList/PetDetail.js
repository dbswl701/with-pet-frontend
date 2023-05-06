import React from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function PetDetail({ pet, onToggle }) {
  // const [isModify, setIsModify] = useState(false);
  const petSpec = [
    { name: '견종', value: pet.dog_breed },
    { name: '생일', value: pet.dog_birth },
    { name: '성별', value: pet.dog_gender },
    { name: '중성화 여부', value: pet.neutralization },
    { name: '몸무게', value: pet.dog_weight },
    { name: '등록코드', value: pet.dog_isbn },
  ];
  const detail = (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="pet-first">
          <div className="pet-img-group">
            <img className="pet-img" src={pet.dog_img} alt="반려견 프로필 사진" />
            <div className="pet-group">
              <button>그룹관리</button>
              <p>초대코드 : ABCD</p>
              <p>맴버1</p>
              <p>맴버2</p>
              <button>그룹 나가기</button>
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
                      <Typography gutterBottom>{spec.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{spec.value}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </div>
            <button onClick={() => onToggle('modify')}>수정</button>
          </div>
        </div>
        <div className="pet-second">
          <button>사회화</button>
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
