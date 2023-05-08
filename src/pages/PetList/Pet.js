import React, { useState } from 'react';
import './Pets.css';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import PetModify from './PetModify';
import PetDetail from './PetDetail';

function Pet({ pet, onSubmitModify }) {
  const [toggle, setToggle] = useState('simple');
  const simple = (
    <>
      <img className="pet-img" src={pet.dog_img} alt="반려견 프로필 사진" />
      <p>{pet.dog_name} / {pet.dog_breed} / {pet.dog_birth}</p>
      <ExpandCircleDownIcon className="down-icon" fontSize="large" onClick={() => setToggle('detail')} />
    </>
  );

  const onToggle = (state) => {
    setToggle(state);
  };

  let print = simple;

  switch (toggle) {
    case 'detail':
      print = <PetDetail pet={pet} onToggle={onToggle} />;
      break;
    case 'modify':
      print = <PetModify petInfo={pet} onSubmit={onSubmitModify} onToggle={onToggle} />;
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
