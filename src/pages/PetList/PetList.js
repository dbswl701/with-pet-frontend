import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Pet from './Pet';
import JoinParty from './JoinParty';
import CreateParty from './CreateParty';
import './Pets.css';
import PetAdd from './PetAdd';
import Party from './Party';
import dogimgdefault from '../../assets/dogProfileImage.png';

const Button = styled.button`
  background-color: #CAA969;
  border: none;
  border-radius: 10px;
  width: 256px;
  height: 50px;
  color: white;
`;

function PetList() {
  const [pets, setPets] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [openParty, setOpenParty] = useState(false); // 모달창
  const [openCreate, setOpenCreate] = useState(false);
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  const [petInfo, setPetInfo] = useState({
    dog_name: '',
    dog_breed: '',
    dog_birth: dayjs(today),
    dog_gender: '',
    neutralization: '',
    dog_weight: '',
    dog_img: '',
    dog_isbn: '',
  });
  // const nextId = useRef(3);

  const onChange = (e) => {
    // console.log(dateNow);
    // console.log(today);
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPetInfo({
          ...petInfo,
          dog_img: reader.result,
        });
      };
    } else {
      const { value, name } = e.target;
      setPetInfo({
        ...petInfo,
        [name]: value,
      });
    }
  };

  const onSubmit = (e, partyId) => {
    e.preventDefault();
    // console.log(partyId);
    let img = petInfo.dog_img;
    if (img === '') {
      img = dogimgdefault;
    }
    const pet = {
      // dog_id: nextId.current,
      dog_name: petInfo.dog_name,
      dog_breed: petInfo.dog_breed,
      dog_birth: petInfo.dog_birth,
      dog_gender: petInfo.dog_gender,
      neutralization: petInfo.neutralization,
      dog_weight: petInfo.dog_weight,
      dog_img: img,
      dog_isbn: petInfo.dog_isbn,
    };
    // nextId.current += 1;
    axios.post(`https://withpet.site/api/v1/dogs/register-dog/${partyId}`, pet, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        // console.log(partyId);
        // console.log(groupList);
        const updatedResult = groupList.map((item) => {
          // console.log(item.partyId, partyId);
          // console.log(item);
          if (item.partyId === partyId) {
            // console.log('여기가 맞는데');
            // console.log(item.dogInfoResponseList.concat(res.data.result));
            return { ...item, dogInfoResponseList: item.dogInfoResponseList.concat(res.data.result) };
          }
          return item;
        });
        // console.log(updatedResult);
        setGroupList(updatedResult);
      })
      .catch(() => {
      });
    setPetInfo({
      // dog_id: '',
      dog_name: '',
      dog_breed: '',
      dog_birth: '',
      dog_gender: '',
      neutralization: '',
      dog_weight: '',
      dog_img: '',
      dog_isbn: '',
    });
  };

  useEffect(() => {
    // axios.get('https://withpet.site/api/v1/dogs', { withCredentials: true })
    //   .then((res) => {
    //     setPets(res.data.result);
    //     // console.log(res.data.result);
    //   })
    //   .catch(() => {
    //   });
    axios.get('https://withpet.site/api/v1/groups/group-infos', { withCredentials: true })
      .then((res) => {
        setGroupList(res.data.result);
        // console.log(res.data.result);
      })
      .catch(() => {
      });
  }, []);

  const onSubmitModify = (id, modifyPetInfo) => {
    // setPets(pets.map((pet) => (pet.id === id ? modifyPetInfo : pet)));
    axios.put(`https://withpet.site/api/v1/dogs/${id}`, modifyPetInfo, { withCredentials: true })
      .then((res) => {
        const updatedPets = pets.map((pet) => {
          if (pet.dog_id === res.data.result.dog_id) {
            return res.data.result;
          }
          return pet;
        });
        setPets(updatedPets);
      })
      .catch(() => {
      });
  };

  const onCancle = () => {
    setPetInfo({
      dog_name: '',
      dog_breed: '',
      dog_birth: '',
      dog_gender: '',
      neutralization: '',
      dog_weight: '',
      dog_img: '',
      dog_isbn: '',
    });
  };

  return (
    <>
      <div className="list_container">
        {/* {pets && pets.map((pet) => { */}
        { groupList[0] && groupList.map((group) => (
          <div key={group.partyId}>
            <Party group={group} />
            { group.dogInfoResponseList.map((pet) => {
              // console.log(pet);
              return <Pet pet={pet} key={pet.dog_id} onSubmitModify={onSubmitModify} />;
            })}
            <PetAdd partyId={group.partyId} pets={pets} setPets={setPets} onSubmit={onSubmit} onChange={onChange} petInfo={petInfo} onCancle={onCancle} />
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '800px' }}>
          <Button onClick={() => setOpenCreate(true)}>그룹생성</Button>
          <Button onClick={() => setOpenParty(true)}>그룹 가입하기</Button>
        </div>
        <CreateParty setGroupList={setGroupList} groupList={groupList} setOpen={setOpenCreate} open={openCreate} />
        <JoinParty setGroupList={setGroupList} groupList={groupList} setOpen={setOpenParty} open={openParty} />
      </div>
    </>
  );
}

export default PetList;
