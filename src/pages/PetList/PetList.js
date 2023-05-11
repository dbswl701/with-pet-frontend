import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Pet from './Pet';
import './Pets.css';
import PetAdd from './PetAdd';
import dogimgdefault from '../../assets/dogProfileImage.png';

function PetList() {
  const [pets, setPets] = useState([]);
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
    console.log(dateNow);
    console.log(today);
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
    axios.post('https://withpet.site/api/v1/dogs/register-dog', pet)
      .then((res) => {
        setPets(pets.concat(res.data.result));
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
    axios.get('https://withpet.site/api/v1/dogs')
      .then((res) => {
        setPets(res.data.result);
        console.log(res.data.result);
      })
      .catch(() => {
      });
  }, []);

  const onSubmitModify = (id, modifyPetInfo) => {
    // setPets(pets.map((pet) => (pet.id === id ? modifyPetInfo : pet)));
    axios.put(`https://withpet.site/api/v1/dogs/${id}`, modifyPetInfo)
      .then((res) => {
        const updatedPets = pets.map((pet) => {
          if (pet.id === updatedPets.id) {
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
        {pets.map((pet) => {
          return <Pet pet={pet} key={pet.dog_id} onSubmitModify={onSubmitModify} />;
        })}
        <PetAdd onSubmit={onSubmit} onChange={onChange} petInfo={petInfo} onCancle={onCancle} />
      </div>
    </>
  );
}

export default PetList;
