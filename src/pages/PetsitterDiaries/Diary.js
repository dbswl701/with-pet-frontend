import React, { useState } from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
// import PetModify from './PetModify';
import DiaryDetail from './DiaryDetail';
import DiaryModify from './DiaryModify';

function Pet({ pet, onSubmitModify, categories }) {
  const [toggle, setToggle] = useState('simple');
  const simple = (
    <>
      <img className="pet-img" src={pet.dogImgToday} alt="반려견 프로필 사진" />
      <p>{pet.createdAt} / {pet.categoryName} / {pet.title}</p>
      <ExpandCircleDownIcon className="down-icon" fontSize="large" onClick={() => setToggle('detail')} />
    </>
  );

  const onToggle = (state) => {
    setToggle(state);
  };

  let print = simple;

  switch (toggle) {
    case 'detail':
      print = <DiaryDetail pet={pet} onToggle={onToggle} />;
      break;
    case 'modify':
      print = <DiaryModify petInfo={pet} onSubmit={onSubmitModify} onToggle={onToggle} categories={categories} />;
      break;
    case 'simple':
      print = simple;
      break;
    default:
      print = simple;
      break;
  }
  return (
    <div className={`${toggle === 'simple' ? 'pet-block' : 'pet-detail'}`}>
      { print }
    </div>
  );
}

export default Pet;
