import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pet from './Pet';
import './Pets.css';
import PetAdd from './PetAdd';
import dogimgdefault from '../../assets/dogProfileImage.png';

function PetList() {
  const [pets, setPets] = useState([
    {
      dog_id: 0,
      dog_name: '멍멍이',
      dog_breed: '진돗개',
      dog_birth: '2023-04-30',
      dog_gender: 'male',
      neutralization: 'true',
      dog_weight: '2',
      dog_isbn: '12345678',
      dog_img: 'https://img.freepik.com/premium-photo/little-fluffy-puppy-of-pomeranian-spitz-lying-on-bright-yellow-background_253512-22.jpg',
    },
    {
      dog_id: 1,
      dog_name: '강아지',
      dog_breed: '진돗개',
      dog_birth: '2023-04-30',
      dog_gender: 'female',
      neutralization: 'true',
      dog_weight: '3',
      dog_isbn: '87654321',
      dog_img: 'https://image.dongascience.com/Photo/2022/06/6982fdc1054c503af88bdefeeb7c8fa8.jpg',
    },
    {
      dog_id: 2,
      dog_name: '복실이',
      dog_breed: '진돗개',
      dog_birth: '2023-04-30',
      dog_gender: 'male',
      neutralization: 'true',
      dog_weight: '4',
      dog_isbn: '13572468',
      dog_img: 'https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525081724428qquq.jpg',
    },
  ]);

  const [petInfo, setPetInfo] = useState({
    dog_name: '',
    dog_breed: '',
    dog_birth: '',
    dog_gender: '',
    neutralization: '',
    dog_weight: '',
    dog_img: '',
    dog_isbn: '',
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
    setPets(pets.concat(pet));
    // nextId.current += 1;
    axios.post('http://ec2-3-39-193-176.ap-northeast-2.compute.amazonaws.com:8080/api/v1/dogs/register-dog', pet)
      .then(() => {
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
    axios.get('http://ec2-3-39-193-176.ap-northeast-2.compute.amazonaws.com:8080/api/v1/dogs')
      .then((res) => {
        setPets(res.data.result);
      })
      .catch(() => {
      });
  }, []);

  const onSubmitModify = (id, modifyPetInfo) => {
    setPets(pets.map((pet) => (pet.id === id ? modifyPetInfo : pet)));
  };

  return (
    <>
      <div className="list_container">
        {pets.map((pet) => {
          return <Pet pet={pet} key={pet.dog_id} onSubmitModify={onSubmitModify} />;
        })}
        <PetAdd onSubmit={onSubmit} onChange={onChange} petInfo={petInfo} />
      </div>
    </>
  );
}

export default PetList;
