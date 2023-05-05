import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Pet from './Pet';
import './Pets.css';
import PetAdd from './PetAdd';

function PetList() {
  const [pets, setPets] = useState([
    {
      id: 0,
      name: '멍멍이',
      breed: '진돗개',
      birthday: '2023-04-30',
      gender: 'male',
      neutralization: 'true',
      weight: '2',
      isbn: '12345678',
      img: 'https://img.freepik.com/premium-photo/little-fluffy-puppy-of-pomeranian-spitz-lying-on-bright-yellow-background_253512-22.jpg',
    },
    {
      id: 1,
      name: '강아지',
      breed: '진돗개',
      birthday: '2023-04-30',
      gender: 'female',
      neutralization: 'true',
      weight: '3',
      isbn: '87654321',
      img: 'https://image.dongascience.com/Photo/2022/06/6982fdc1054c503af88bdefeeb7c8fa8.jpg',
    },
    {
      id: 2,
      name: '복실이',
      breed: '진돗개',
      birthday: '2023-04-30',
      gender: 'male',
      neutralization: 'true',
      weight: '4',
      isbn: '13572468',
      img: 'https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525081724428qquq.jpg',
    },
  ]);

  const [petInfo, setPetInfo] = useState({
    name: '',
    breed: '',
    birthday: '',
    gender: '',
    neutralization: '',
    weight: '',
    img: '',
    isbn: '',
  });
  const nextId = useRef(3);

  const onChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPetInfo({
          ...petInfo,
          img: reader.result,
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
    const pet = {
      id: nextId.current,
      name: petInfo.name,
      breed: petInfo.breed,
      birthday: petInfo.birthday,
      gender: petInfo.gender,
      neutralization: petInfo.neutralization,
      weight: petInfo.weight,
      img: petInfo.img,
      isbn: petInfo.isbn,
    };
    setPets(pets.concat(pet));
    setPetInfo({
      id: '',
      name: '',
      breed: '',
      birthday: '',
      gender: '',
      neutralization: '',
      weight: '',
      img: '',
      isbn: '',
    });
    nextId.current += 1;
  };

  useEffect(() => {
    axios.get('https://d45162fd-d516-4456-83d9-d3b784b62ec2.mock.pstmn.io/api/v1/users/login')
      .then((res) => {
        console.log(res.data);
        setPets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="list_container">
        {pets.map((pet) => {
          return <Pet pet={pet} key={pet.id} />;
        })}
        <PetAdd onSubmit={onSubmit} onChange={onChange} petInfo={petInfo} />
      </div>
    </>
  );
}

export default PetList;
