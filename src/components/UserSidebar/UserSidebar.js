import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
// import styled from 'styled-components';
import axios from 'axios';
import {
  SideBar, ListContainer, ItemContainer, Button, Items,
} from '../../styles/sidebar/SidebarStyle';

// const SideBar = styled.div`
//   display: flex;
//   background-color: white;
//   height: 100vh;
//   width: 256px;
//   box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
//   border-radius: 5px;
//   margin-top: 50px;
//   margin-left: 40px;
//   flex-direction: column;
// `;

function Item({
  item, name, filter, onChange,
}) {
  return (
    <>
      <div>
        { console.log(item[name], typeof item[name]) }
        <input type="radio" name={name} id={item.name} value={item[name]} onChange={onChange} checked={filter[name] === item[name]} required />
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
    console.log(updatedFilter);
    setFilter(updatedFilter);
    axios.get(`https://4a595605-a86b-482c-96a1-0196009f4a0e.mock.pstmn.io/api/v1/userdiaries?category=${updatedFilter.category}&dogId=${updatedFilter.dogId}&month=${updatedFilter.month}`)
      .then((res) => {
        console.log(res);
      })
      .catch(() => {

      });
  };

  useEffect(() => { // { withCredentials: true } 필요
    axios.get('https://4a595605-a86b-482c-96a1-0196009f4a0e.mock.pstmn.io/api/v1/userdiaries/doglist')
      .then((res) => {
        console.log(res.data.result);
        const updatedDogs = res.data.result.dogSimpleInfoResponses.map((dog) => ({
          dogId: dog.dogId.toString(),
          name: dog.name,
        }));
        setDogs(updatedDogs);
        console.log(res.data.result.dogSimpleInfoResponses);
        const updatedCategories = res.data.result.categoryResponses.map((category) => ({
          categoryId: category.categoryId.toString(),
          name: category.name,
        }));
        setCategories(updatedCategories);
      })
      .catch(() => {
      });
  }, []);
  console.log(dogs);
  console.log(categories);
  return (
    <>
      <SideBar>
        <ListContainer>
          강아지 선택
          <Items>
            {dogs.map((dog) => <Item key={dog.id} name="dogId" item={dog} filter={filter} onChange={onChange} />)}
          </Items>
        </ListContainer>
        <ListContainer>
          작성자 선택
          <ItemContainer>
            <Button>반려인</Button>
            <Button>펫시터</Button>
          </ItemContainer>
        </ListContainer>
        <ListContainer>
          카테고리 선택
          {categories.map((category) => <Item key={category.id} name="category" item={category} filter={filter} onChange={onChange} />)}
        </ListContainer>
      </SideBar>
    </>
  );
}

export default UserSideBar;
