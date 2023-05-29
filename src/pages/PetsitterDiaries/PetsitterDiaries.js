import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import DiaryAdd from './DiaryAdd';
import Diary from './Diary';
// import Pet from './Pet';
// import PetAdd from './PetAdd';
// import dogimgdefault from '../../assets/dogProfileImage.png';
// import dogdiaryimgsample from '../../assets/dogdiaryimgsample.png';

function PetList({ id }) {
  const [diaries, setDiaries] = useState([]);
  // const dateNow = new Date();
  // const today = dateNow.toISOString().slice(0, 10);
  const [categories, setCategories] = useState([]);

  const [petInfo, setPetInfo] = useState({
    categoryId: '',
    contentBody: '',
    createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
    dogImgToday: '',
    title: '',
  });
  // const nextId = useRef(3);

  const onChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPetInfo({
          ...petInfo,
          dogImgToday: reader.result,
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

  const onSubmit = (e) => {
    e.preventDefault();
    // let img = petInfo.dog_img;
    // if (img === '') {
    //   img = dogimgdefault;
    // }
    const pet = {
      ...petInfo,
      dogId: id,
    };
    // nextId.current += 1;
    console.log(pet);
    axios.post('https://withpet.site/api/v1/petsitter-diaries', pet, { withCredentials: true })
      .then((res) => {
        setDiaries(diaries.concat(res.data.result));
      })
      .catch(() => {
      });
  };

  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/petsitter-diaries?dogId=${id}`, { withCredentials: true })
      .then((res) => {
        setDiaries(res.data.result);
        console.log(res.data.result);
      })
      .catch(() => {
      });

    axios.get('https://withpet.site/api/v1/category', { withCredentials: true })
      .then((res) => {
        setCategories(res.data.result);
        console.log(res.data.result);
      });
  }, []);

  // useEffect(() => {
  //   axios.get('https://withpet.site/api/v1/category', { withCredentials: true })
  //     .then((res) => {
  //       setCategories(res.data.result);
  //       console.log(res.data.result);
  //     });
  // }, []);

  const onSubmitModify = (id2, modifyPetInfo) => {
    // setPets(pets.map((pet) => (pet.id === id ? modifyPetInfo : pet)));
    axios.put(`https://withpet.site/api/v1/dogs/${id2}`, modifyPetInfo, { withCredentials: true })
      .then((res) => {
        const updatedPets = diaries.map((pet) => {
          if (pet.dog_id === res.data.result.dog_id) {
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
  console.log(diaries);
  return (
    <>
      <div style={{
        margin: '0px auto',
      }}
      >
        <DiaryAdd pets={diaries} setPets={setDiaries} onSubmit={onSubmit} onChange={onChange} petInfo={petInfo} onCancle={onCancle} categories={categories} />
        {diaries && diaries.map((pet) => {
          return <Diary pet={pet} key={pet.petSitterDiaryId} onSubmitModify={onSubmitModify} categories={categories} />;
        })}
      </div>
    </>
  );
}

export default PetList;
