import React, { useState } from 'react';
import './Pets.css';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import PetModify from './PetModify';
import PetDetail from './PetDetail';

function Pet({ pet, onSubmitModify }) {
  const [toggle, setToggle] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const simple = (
    <>
      <img className="pet-img" src={pet.dog_img} alt="반려견 프로필 사진" />
      <p>{pet.dog_name} / {pet.dog_breed} / {pet.dog_birthday}</p>
      <ExpandCircleDownIcon className="down-icon" fontSize="large" onClick={() => setToggle(!toggle)} />
    </>
  );

  const onToggle = () => {
    setToggle(!toggle);
  };

  const onModify = () => {
    setIsModify(!isModify);
  };

  let print = simple;
  if (!toggle) {
    print = simple;
  } else if (!isModify) {
    print = <PetDetail pet={pet} onClick={onToggle} onModify={onModify} />;
  } else {
    print = <PetModify petInfo={pet} onSubmit={onSubmitModify} setIsModify={setIsModify} />;
  }
  return (
    <div className={`${!toggle ? 'pet-block' : 'pet-detail'}`}>
      {/* { !toggle ? simple : detail } */}
      { print }
    </div>
  );
}

export default Pet;
