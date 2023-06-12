import React, { useState } from 'react';
import axios from 'axios';
import './Pets.css';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import PetModify from './PetModify';
import PetDetail from './PetDetail';

function Pet({
  pet, onSubmitModify, partyId, setGroupList, isLeader,
}) {
  const [removeDog, setRemoveDog] = useState(false);
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

  const handleRemoveDog = (dogId) => {
    axios.delete(`https://withpet.site/api/v1/dogs/${dogId}`, { withCredentials: true })
      .then((res) => {
        setRemoveDog(true);

        // 만약 그룹의 마지막 개라면, 그룹 삭제
        if (res.data.result) {
          setGroupList((prev) => prev.filter((group) => group.partyId !== partyId));
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message);
        }
      });
  };

  let print = simple;

  switch (toggle) {
    case 'detail':
      print = <PetDetail pet={pet} onToggle={onToggle} handleRemoveDog={handleRemoveDog} isLeader={isLeader} />;
      break;
    case 'modify':
      print = (
        <PetModify
          petInfo={pet}
          onSubmit={onSubmitModify}
          onToggle={onToggle}
          partyId={partyId}
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
    <div className={`${toggle === 'simple' ? 'pet-block' : 'pet-detail'}`} style={{ display: removeDog ? 'none' : 'flex' }}>
      {print}
    </div>
  );
}

export default Pet;
