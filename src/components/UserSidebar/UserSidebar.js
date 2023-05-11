import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const SideBar = styled.div`
display: flex;
background-color: white;
height: 100vh;
width: 256px;
box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
border-radius: 5px;
margin-top: 50px;
margin-left: 40px;
flex-direction: column;
`;

function Dog({
  id, name, isChecked, onChange,
}) {
  return (
    <>
      <FormControlLabel control={<Checkbox />} label={name} checked={isChecked} onChange={() => onChange(id)} />
    </>
  );
}

function UserSideBar() {
  const [dogs, setDogs] = useState([
    { id: 0, name: '멍멍이', isChecked: false },
    { id: 1, name: '멍멍이2', isChecked: false },
    { id: 2, name: '멍멍이3', isChecked: false },
  ]);
  const handleDogChange = (id) => {
    setDogs((prevDogs) => {
      const updatedDogs = prevDogs.map((dog) => {
        if (dog.id === id) {
          return { ...dog, isChecked: !dog.isChecked };
        }
        return dog;
      });
      return updatedDogs;
    });
  };

  const [categories, setCategories] = useState([
    { id: 0, name: '산책1', isChecked: false },
    { id: 1, name: '산책2', isChecked: false },
    { id: 2, name: '산책3', isChecked: false },
  ]);

  const handleCategoryChange = (id) => {
    setCategories((prevDogs) => {
      const updatedCategories = prevDogs.map((category) => {
        if (category.id === id) {
          return { ...category, isChecked: !category.isChecked };
        }
        return category;
      });
      return updatedCategories;
    });
  };
  console.log(dogs);
  console.log(categories);
  return (
    <>
      <SideBar>
        <div style={{ backgroundColor: 'red' }}>
          강아지 선택
          <FormGroup>
            {dogs.map((dog) => <Dog key={dog.id} id={dog.id} name={dog.name} isChecked={dog.isChecked} onChange={handleDogChange} />)}
          </FormGroup>
        </div>
        <div style={{ backgroundColor: 'yellow' }}>
          반려인 / 펫시터 선택
          <FormGroup>
            {/* {categories.map((category) => <Dog key={category.id} id={category.id} name={category.name} isChecked={category.isChecked} onChange={handleCategoryChange} />)} */}
          </FormGroup>
        </div>
        <div style={{ backgroundColor: 'green' }}>
          카테고리 선택
          <FormGroup>
            {categories.map((category) => <Dog key={category.id} id={category.id} name={category.name} isChecked={category.isChecked} onChange={handleCategoryChange} />)}
          </FormGroup>
        </div>
      </SideBar>
    </>
  );
}

export default UserSideBar;
