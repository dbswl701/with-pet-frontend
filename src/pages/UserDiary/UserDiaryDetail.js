import React from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function UserDiaryDetail({ diary, onToggle }) {
  const diarySpec = [
    { name: '이름', value: diary.dogName },
    { name: '날짜', value: diary.createdAt },
    { name: '카테고리', value: diary.categoryName },
    { name: '제목', value: diary.title },
    { name: '내용', value: diary.content },
  ];
  const detail = (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="diary-first">
          <img className="today-img" src={diary.media} alt="오늘의 사진" style={{ width: '100px', height: '100px' }} />
        </div>
        <div className="diary-contents">
          <Grid container ml={2}>
            {diarySpec.map((spec) => (
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
      <div>
        <ExpandCircleDownIcon
          className="up-icon"
          fontSize="large"
          onClick={() => onToggle('simple')}
        />
      </div>
    </>
  );

  return <>{detail}</>;
}

export default UserDiaryDetail;
