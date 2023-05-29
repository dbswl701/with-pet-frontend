import React, { useState } from 'react';
import './Pets.css';
// import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import PetModify from './PetModify';
import PetDetail from './PetDetail';

function Pet({ pet, onSubmitModify }) {
  const [toggle, setToggle] = useState('simple');
  const simple = (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <img className="pet-img" src={pet.dog_img} alt="반려견 프로필 사진" />
      <p>
        {pet.dog_name} / {pet.dog_breed} / {pet.dog_birth}
      </p>
      <ChevronLeftOutlinedIcon
        className="down-icon"
        fontSize="large"
        onClick={() => setToggle('detail')}
      />
    </div>
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
      print = (
        <PetModify
          petInfo={pet}
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
    <div className={`${toggle === 'simple' ? 'pet-block' : 'pet-detail'}`}>
      {print}
    </div>
  );
}

export default Pet;
