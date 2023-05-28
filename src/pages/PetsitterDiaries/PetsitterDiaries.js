import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import DiaryAdd from './DiaryAdd';
import Diary from './Diary';
// import Pet from './Pet';
// import PetAdd from './PetAdd';
import dogimgdefault from '../../assets/dogProfileImage.png';
import dogdiaryimgsample from '../../assets/dogdiaryimgsample.png';

function PetList() {
  const [diaries, setDiaries] = useState([]);
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

  const onSubmit = (e) => {
    e.preventDefault();
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
    axios.post('https://withpet.site/api/v1/dogs/register-dog', pet, { withCredentials: true })
      .then((res) => {
        setDiaries(diaries.concat(res.data.result));
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
    axios.get('https://withpet.site/api/v1/dogs', { withCredentials: true })
      .then(() => {
        // setDiaries(res.data.result.content);
        setDiaries([
          {
            id: 1,
            name: '강아지',
            title: '산책갔어요~~',
            img: dogdiaryimgsample,
            category: '산책',
            content: '오늘 날씨가 좋아서 친구랑 같이 산책을 나갔어요',
            date: '2023-05-23',
          },
          {
            id: 2,
            name: '강아지',
            title: '산책갔어요~~',
            img: dogdiaryimgsample,
            category: '산책',
            content: '오늘 날씨가 좋아서 친구랑 같이 산책을 나갔어요',
            date: '2023-05-23',
          },
          {
            id: 3,
            name: '강아지',
            title: '산책갔어요~~',
            img: dogdiaryimgsample,
            category: '산책',
            content: '오늘 날씨가 좋아서 친구랑 같이 산책을 나갔어요',
            date: '2023-05-23',
          },
        ]);
      })
      .catch(() => {
      });
  }, []);

  const onSubmitModify = (id, modifyPetInfo) => {
    // setPets(pets.map((pet) => (pet.id === id ? modifyPetInfo : pet)));
    axios.put(`https://withpet.site/api/v1/dogs/${id}`, modifyPetInfo, { withCredentials: true })
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
        <DiaryAdd pets={diaries} setPets={setDiaries} onSubmit={onSubmit} onChange={onChange} petInfo={petInfo} onCancle={onCancle} />
        {diaries.map((pet) => {
          return <Diary pet={pet} key={pet.dog_id} onSubmitModify={onSubmitModify} />;
        })}
      </div>
    </>
  );
}

export default PetList;
