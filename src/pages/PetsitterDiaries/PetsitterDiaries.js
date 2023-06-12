import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import DiaryAdd from './DiaryAdd';
import Diary from './Diary';

function PetList({ id }) {
  const [diaries, setDiaries] = useState([]);
  const [categories, setCategories] = useState([]);

  const [petInfo, setPetInfo] = useState({
    categoryId: '',
    contentBody: '',
    createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
    dogImgToday: '',
    title: '',
  });

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
          dogImgToday: res.data.result[0],
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

  const onSubmit = (e) => {
    e.preventDefault();
    const pet = {
      ...petInfo,
      dogId: id,
    };

    axios.post('https://withpet.site/api/v1/petsitter-diaries', pet, { withCredentials: true })
      .then((res) => {
        setDiaries({
          ...diaries,
          petSitterDiaryResponses: diaries.petSitterDiaryResponses.concat(res.data.result),
        });
      })
      .catch(() => {
      });
  };

  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/petsitter-diaries?dogId=${id}`, { withCredentials: true })
      .then((res) => {
        setDiaries(res.data.result);
      })
      .catch(() => {
      });
    axios.get('https://withpet.site/api/v1/category', { withCredentials: true })
      .then((res) => {
        setCategories(res.data.result);
      });
  }, []);

  const onSubmitModify = (id2, modifyPetInfo) => {
    axios.put(`https://withpet.site/api/v1/petsitter-diaries/${id2}`, modifyPetInfo, { withCredentials: true })
      .then((res) => {
        const updatedPets = diaries.petSitterDiaryResponses.map((pet) => {
          if (pet.petSitterDiaryId === res.data.result.petSitterDiaryId) {
            return res.data.result;
          }
          return pet;
        });
        setDiaries(updatedPets);
      })
      .catch(() => {
      });
  };

  const onCancle = () => {
    setPetInfo({
      categoryId: '',
      contentBody: '',
      createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
      dogImgToday: '',
      title: '',
    });
  };
  return (
    <>
      <div style={{
        margin: '0px auto',
      }}
      >
        <div style={{
          display: 'flex', flexDirection: 'row', marginTop: '20px', borderBottom: '1.5px solid gray',
        }}
        >
          <img src={diaries.dogImg} alt="강아지 이미지" style={{ width: '60px', height: '60px' }} />
          <p style={{ fontSize: '20px', marginLeft: '20px' }}>{diaries.dogName}</p>
        </div>
        <DiaryAdd pets={diaries} setPets={setDiaries} onSubmit={onSubmit} onChange={onChange} petInfo={petInfo} onCancle={onCancle} categories={categories} />
        {diaries.petSitterDiaryResponses && diaries.petSitterDiaryResponses.map((pet) => {
          return <Diary pet={pet} key={pet.petSitterDiaryId} onSubmitModify={onSubmitModify} categories={categories} />;
        })}
      </div>
    </>
  );
}

export default PetList;
