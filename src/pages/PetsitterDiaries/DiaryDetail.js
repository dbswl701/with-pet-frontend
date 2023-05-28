import React from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function PetDetail({ pet, onToggle }) {
  // const [isModify, setIsModify] = useState(false);
  const petSpec = [
    { name: '작성날짜', value: pet.date },
    { name: '카테고리', value: pet.category },
    { name: '제목', value: pet.title },
    { name: '내용', value: pet.content },

  ];
  // console.log(pet);
  const detail = (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
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
          <div className="pet-img-group">
            <img src={pet.img} alt="일지 사진" />
          </div>
        </div>
        <div>
          <button onClick={() => onToggle('modify')}>수정</button>
          <button onClick={() => onToggle('modify')}>삭제</button>
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
