import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import axios from 'axios';
import UserDiaryListAdd from '../../pages/UserDiary/UserDiaryListAdd';

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
        <input type="radio" name={name} id={item.name} value={item[name]} onChange={onChange} checked={filter[name] === item[name]} required />
        <label htmlFor={item.name}>{item.name}</label>
      </div>
    </>
  );
}

function UserSideBar({
  setFilteredDiaries, filter, setFilter, open, setOpen, filteredDiaries,
}) {
  const [dogs, setDogs] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [filteredDiaries, setFilteredDiaries] = useState([]);
  // const [filter, setFilter] = useState({
  //   dogId: '',
  //   categoryId: '',
  //   month: dayjs(new Date()).format('YYYY-MM'),
  // });
  // const colorList = ['red', 'yellow', 'green', 'blue', 'orange', 'violet', 'gray'];
  const colorList = ['#64C8F3', '#F36464', '#57DF86', '#DFDA57', '#CAA969', 'violet', 'gray'];

  const onChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const updatedFilter = {
      ...filter,
      [name]: value,
    };
    // console.log(updatedFilter);
    setFilter(updatedFilter);
    axios.get(`https://withpet.site/api/v1/userdiaries/month?categoryId=${updatedFilter.categoryId}&dogId=${updatedFilter.dogId}&month=${updatedFilter.month}&petsitterCheck=${updatedFilter.petsitterCheck}`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        const { result } = res.data;
        // 이제 달력 보여줄거 업데이트 하자
        // console.log(dogs);
        const temp = result.map((item) => ({
          start: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          end: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          color: colorList[(item.dogId % colorList.length) - 1],
          title: item.dogName,
        }));
        setFilteredDiaries(temp);
        // console.log(temp);
      })
      .catch(() => {

      });
  };
  // console.log(filteredDiaries);
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/calendar', { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        const updatedDogs = res.data.result.dogSimpleInfoResponses.map((dog) => ({
          dogId: dog.dogId.toString(),
          name: dog.name,
        }));
        setDogs(updatedDogs);
        // console.log(res.data.result.dogSimpleInfoResponses);
        const updatedCategories = res.data.result.categoryResponses.map((category) => ({
          categoryId: category.categoryId.toString(),
          name: category.name,
        }));
        setCategories(updatedCategories);
      })
      .catch(() => {
      });

    // 필터링 안했을 때 정보 불러옴
    axios.get(`https://withpet.site/api/v1/userdiaries/month?categoryId=&dogId=&month=${filter.month}`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        const { result } = res.data;
        // 이제 달력 보여줄거 업데이트 하자
        // console.log(dogs);
        const temp = result.map((item) => ({
          start: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          end: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          color: colorList[(item.dogId % colorList.length) - 1],
          title: item.dogName,
        }));
        setFilteredDiaries(temp);
        // console.log(temp);
      })
      .catch(() => {

      });
  }, []);
  // console.log(dogs);
  // console.log(categories);
  return (
    <>
      <SideBar>
        <div>
          <button style={{ width: '256px' }} onClick={() => setOpen(true)}>일지 작성</button>
        </div>
        <UserDiaryListAdd open={open} setOpen={setOpen} setFilteredDiaries={setFilteredDiaries} filteredDiarie={filteredDiaries} />
        <div style={{ margin: '20px 10px', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px' }}>
          강아지 선택
          {dogs.map((dog) => <Item key={dog.dogId} name="dogId" item={dog} filter={filter} onChange={onChange} />)}
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', margin: '20px 10px', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
        }}
        >
          작성자 선택
          <input type="button" value="PETSITTER" name="petsitterCheck" onClick={onChange} />
          <input type="button" value="USER" name="petsitterCheck" onClick={onChange} />
          {/* <button>반려인</button>
          <button>펫시터</button> */}
        </div>
        <div style={{ margin: '20px 10px', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px' }}>
          카테고리 선택
          {categories.map((category) => <Item key={category.categoryId} name="categoryId" item={category} filter={filter} onChange={onChange} />)}
        </div>
      </SideBar>
    </>
  );
}

export default UserSideBar;
