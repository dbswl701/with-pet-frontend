import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import axios from 'axios';

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

function Item({
  item, name, filter, onChange,
}) {
  return (
    <>
      <div>
        <input type="radio" name={name} id={item.name} value={item.id} onChange={onChange} checked={filter[name] === item.id} required />
        <label htmlFor={item.name}>{item.name}</label>
      </div>
    </>
  );
}

function UserSideBar() {
  const [dogs, setDogs] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filter, setFilter] = useState({
    dogId: '',
    category: '',
    month: dayjs(new Date()).format('YYYY-MM'),
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = {
      ...filter,
      [name]: value,
    };
    setFilter(updatedFilter);
    axios.get(`https://d45162fd-d516-4456-83d9-d3b784b62ec2.mock.pstmn.io/api/v1/userdiaries?category=${updatedFilter.category}&dogId=${updatedFilter.dogId}&month=${updatedFilter.month}`)
      .then((res) => {
        console.log(res);
      })
      .catch(() => {

      });
  };

  useEffect(() => { // { withCredentials: true } 필요
    axios.get('https://d45162fd-d516-4456-83d9-d3b784b62ec2.mock.pstmn.io/api/v1/userdiaries/doglist')
      .then((res) => {
        const updatedDogs = res.data.dogList.map((dog) => ({
          id: dog.id.toString(),
          name: dog.name,
        }));
        setDogs(updatedDogs);
        const updatedCategories = res.data.categoryList.map((category) => ({
          id: category.id.toString(),
          name: category.name,
        }));
        setCategories(updatedCategories);
      })
      .catch(() => {
      });
  }, []);

  return (
    <>
      <SideBar>
        <div style={{ backgroundColor: 'red' }}>
          강아지 선택
          {dogs.map((dog) => <Item key={dog.id} name="dogId" item={dog} filter={filter} onChange={onChange} />)}
        </div>
        <div>
          작성자 선택
          <button>반려인</button>
          <button>펫시터</button>
        </div>
        <div style={{ backgroundColor: 'red' }}>
          카테고리 선택
          {categories.map((category) => <Item key={category.id} name="category" item={category} filter={filter} onChange={onChange} />)}
        </div>
      </SideBar>
    </>
  );
}

export default UserSideBar;
