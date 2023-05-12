import React, { useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

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
  const dogs = [
    { id: '1', name: '멍멍이1' },
    { id: '2', name: '멍멍이2' },
    { id: '3', name: '멍멍이3' },
  ];

  const categories = [
    { id: '1', name: '산책1' },
    { id: '2', name: '산책2' },
    { id: '3', name: '산책3' },
  ];

  const [filter, setFilter] = useState({
    dogId: '',
    category: '',
    month: dayjs(new Date()).format('YYYY-MM'),
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  console.log(filter);
  return (
    <>
      <SideBar>
        <div style={{ backgroundColor: 'red' }}>
          강아지 선택
          {dogs.map((dog) => <Item key={dog.id} name="dogId" item={dog} filter={filter} onChange={onChange} />)}
        </div>
        <div style={{ backgroundColor: 'red' }}>
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
