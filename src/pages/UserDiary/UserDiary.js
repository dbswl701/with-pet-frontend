import React, { useState } from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import UserDiaryModify from './UserDiaryModify';
import UserDiaryDetail from './UserDiaryDetail';

function UserDiary({}) { diary, onSubmitModify } {
  const [toggle, setToggle] = useState('simple');
  const simple = (
    <>
      <p>{diary.date} / {diary.title} / {diary.content}</p>
      <ExpandCircleDownIcon className="down-icon" fontSize="large" onClick={() => setToggle('detail')} />
    </>
  );

  const onToggle = (state) => {
    setToggle(state);
  };

  let print = simple;

  switch (toggle) {
    case 'detail':
      print = <UserDiaryDetail diary={diary} onToggle={onToggle} />;
      break;
    case 'modify':
      print = <UserDiaryModify diaryInfo={diary} onSubmit={onSubmitModify} onToggle={onToggle} />;
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
      { print }
    </div>
  );
}

export default UserDiary;
