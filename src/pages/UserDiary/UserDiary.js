import React, { useState } from 'react';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import UserDiaryModify from './UserDiaryModify';
import UserDiaryDetail from './UserDiaryDetail';

function UserDiary({ diary, onSubmitModify, handleRemove }) {
  const [toggle, setToggle] = useState('simple');
  const simple = (
    <>
      <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '350px', marginLeft: '20px',
      }}
      >
        <p style={{ fontWeight: 'bold' }}>{diary.createdAt} | {diary.categoryName} | {diary.title}</p>
      </div>

      <ChevronLeftOutlinedIcon
        className="up-icon"
        fontSize="large"
        onClick={() => setToggle('detail')}
      />
    </>
  );

  const onToggle = (state) => {
    setToggle(state);
  };

  let print = simple;

  switch (toggle) {
    case 'detail':
      print = <UserDiaryDetail diary={diary} onToggle={onToggle} handleRemove={handleRemove} />;
      break;
    case 'modify':
      print = (
        <UserDiaryModify
          diaryInfo={diary}
          onSubmit={onSubmitModify}
          onToggle={onToggle}
        />
      );
      break;
    case 'simple':
      print = simple;
      break;
    default:
      print = simple;
      break;
  }
  return (
    <div className={`${toggle === 'simple' ? 'diary-block' : 'diary-detail'}`}>
      {print}
    </div>
  );
}

export default UserDiary;
