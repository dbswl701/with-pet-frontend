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
  const [openParty, setOpenParty] = useState(false);
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
  const [userName] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).userName : '');

  const handleImageUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.post('https://withpet.site/api/v1/file/upload', formData, config)
      .then((res) => {
        setPetInfo({
          ...petInfo,
          dog_img: res.data.result[0],
        });
      });
  };
  const onChange = (e) => {
    if (e.target.files) {
      handleImageUpload(e);
    } else {
      const { value, name } = e.target;
      setPetInfo({
        ...petInfo,
        [name]: value,
      });
    }
  };

  const onSubmitCreateGroup = (e) => {
    e.preventDefault();

    axios.post('https://withpet.site/api/v1/groups', petInfo, { withCredentials: true })
      .then((res) => {
        setGroupList(groupList.concat(res.data.result));
      })
      .catch(() => {
      });
    setPetInfo({
      dog_name: '',
      dog_breed: '',
      dog_birth: '',
      dog_gender: '',
      neutralization: '',
      dog_weight: '',
      dog_img: '',
      dog_isbn: '',
      partyName: '',
    });
    setOpenCreate(false);
  };

  const onSubmit = (e, partyId) => {
    e.preventDefault();
    let img = petInfo.dog_img;
    if (img === '') {
      img = dogimgdefault;
    }
    const pet = {
      dog_name: petInfo.dog_name,
      dog_breed: petInfo.dog_breed,
      dog_birth: petInfo.dog_birth,
      dog_gender: petInfo.dog_gender,
      neutralization: petInfo.neutralization,
      dog_weight: petInfo.dog_weight,
      dog_img: img,
      dog_isbn: petInfo.dog_isbn,
    };
    axios.post(`https://withpet.site/api/v1/dogs/register-dog/${partyId}`, pet, { withCredentials: true })
      .then((res) => {
        const updatedResult = groupList.map((item) => {
          if (item.partyId === partyId) {
            return { ...item, dogInfoResponseList: item.dogInfoResponseList.concat(res.data.result) };
          }
          return item;
        });
        setGroupList(updatedResult);
      })
      .catch(() => {
      });
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

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/groups/group-infos', { withCredentials: true })
      .then((res) => {
        setGroupList(res.data.result);
      })
      .catch(() => {
      });
  }, []);

  const onSubmitModify = (partyId, id, modifyPetInfo) => {
    axios.put(`https://withpet.site/api/v1/dogs/${id}`, modifyPetInfo, { withCredentials: true })
      .then((res) => {
        const updatedResult = groupList.map((item) => {
          if (item.partyId === partyId) {
            const updatedPets = item.dogInfoResponseList.map((pet) => {
              if (pet.dog_id === id) {
                return res.data.result;
              }
              return pet;
            });

            return { ...item, dogInfoResponseList: updatedPets };
          }
          return item;
        });
        setGroupList(updatedResult);
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

  const handleLeaveParty = (partyId) => {
    axios.delete(`https://withpet.site/api/v1/groups/${partyId}`, { withCredentials: true })
      .then(() => {
        // 자신의 groupList에서 해당 그룹 삭제
        setGroupList((prev) => prev.filter((group) => group.partyId !== partyId));
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="list_container">
        { groupList[0] && groupList.map((group) => (
          <div key={group.partyId}>
            <Party group={group} isLeader={group.leaderName === userName} setGroupList={setGroupList} handleLeaveParty={handleLeaveParty} />
            { group.dogInfoResponseList.map((pet) => {
              return <Pet isLeader={group.leaderName === userName} partyId={group.partyId} pet={pet} key={pet.dog_id} onSubmitModify={onSubmitModify} setGroupList={setGroupList} />;
            })}
            <PetAdd partyId={group.partyId} pets={pets} setPets={setPets} onSubmit={onSubmit} onChange={onChange} petInfo={petInfo} onCancle={onCancle} />
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '800px' }}>
          <Button onClick={() => setOpenCreate(true)}>그룹생성</Button>
          <Button onClick={() => setOpenParty(true)}>그룹 가입하기</Button>
        </div>
        <CreateParty setPetInfo={setPetInfo} petInfo={petInfo} setOpen={setOpenCreate} open={openCreate} onChange={onChange} onSubmit={onSubmitCreateGroup} />
        <JoinParty setGroupList={setGroupList} groupList={groupList} setOpen={setOpenParty} open={openParty} />
      </div>
    </>
  );
}

export default PetList;
