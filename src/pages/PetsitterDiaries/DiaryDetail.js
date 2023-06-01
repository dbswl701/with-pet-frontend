import React from 'react';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import Typography from '@mui/material/Typography';

function PetDetail({ pet, onToggle }) {
  // const [isModify, setIsModify] = useState(false);
  // const petSpec = [
  //   { name: '작성날짜', value: pet.createdAt },
  //   { name: '카테고리', value: pet.categoryName },
  //   { name: '제목', value: pet.title },
  //   { name: '내용', value: pet.contentBody },
  // ];
  // console.log(pet);
  const detail = (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div>
            <Typography style={{ fontSize: '25px', fontWeight: 'bold', borderBottom: '1.5px solid gray' }}>{pet.title}</Typography>
            <div style={{
              display: 'flex', flexDirection: 'row', width: '500px', justifyContent: 'space-around', marginTop: '20px',
            }}
            >
              <div style={{
                display: 'flex', flexWrap: 'wrap', width: '100px', height: '130px', alignContent: 'space-around',
              }}
              >
                <Typography style={{ width: '100px' }}>{pet.createdAt}</Typography>
                <Typography style={{ width: '100px', border: '1px solid gray', borderRadius: '10px' }}>{pet.categoryName}</Typography>
              </div>
              <div>
                <img className="today-img" src={pet.dogImgToday} alt="오늘의 사진" style={{ width: '150px', height: '150px' }} />
              </div>
            </div>
            <div style={{
              marginTop: '20px', marginBottom: '20px', border: '1px solid gray', padding: '10px', minHeight: '90px',
            }}
            >
              <Typography align="left">{pet.contentBody}</Typography>
            </div>
          </div>
        </div>
        <button className="diary-add-btn" onClick={() => onToggle('modify')}>수정</button>
      </div>
      <div>
        <ChevronLeftOutlinedIcon className="down-icon" fontSize="large" onClick={() => onToggle('simple')} />
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
