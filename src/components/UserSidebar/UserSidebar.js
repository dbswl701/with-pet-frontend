import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import axios from 'axios';
import {
  SideBar, Button, ListContainer, ItemContainer, Items,
} from '../../styles/sidebar/SidebarStyle';
import UserDiaryListAdd from '../../pages/UserDiary/UserDiaryListAdd';

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
  const navigate = useNavigate();
  const [dogs, setDogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const colorList = ['#64C8F3', '#F36464', '#57DF86', '#DFDA57', '#CAA969', 'violet', 'gray'];

  const onChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = {
      ...filter,
      [name]: value,
    };
    setFilter(updatedFilter);
    axios.get(`https://withpet.site/api/v1/userdiaries/month?categoryId=${updatedFilter.categoryId}&dogId=${updatedFilter.dogId}&month=${updatedFilter.month}&petsitterCheck=${updatedFilter.petsitterCheck}`, { withCredentials: true })
      .then((res) => {
        const { result } = res.data;
        const temp = result.map((item) => ({
          start: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          end: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          color: colorList[(item.dogId % colorList.length) - 1],
          title: item.dogName,
        }));
        setFilteredDiaries(temp);
      })
      .catch(() => {

      });
  };
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/calendar', { withCredentials: true })
      .then((res) => {
        const updatedDogs = res.data.result.dogSimpleInfoResponses.map((dog) => ({
          dogId: dog.dogId.toString(),
          name: dog.name,
        }));
        setDogs(updatedDogs);
        const updatedCategories = res.data.result.categoryResponses.map((category) => ({
          categoryId: category.categoryId.toString(),
          name: category.name,
        }));
        setCategories(updatedCategories);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // eslint-disable-next-line no-alert
          alert('로그인이 필요한 서비스입니다.');
          navigate('/login');
        }
      });

    // 필터링 안했을 때 정보 불러옴
    axios.get(`https://withpet.site/api/v1/userdiaries/month?categoryId=&dogId=&month=${filter.month}`, { withCredentials: true })
      .then((res) => {
        const { result } = res.data;
        const temp = result.map((item) => ({
          start: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          end: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          color: colorList[(item.dogId % colorList.length) - 1],
          title: item.dogName,
        }));
        setFilteredDiaries(temp);
      })
      .catch(() => {

      });
  }, []);

  return (
    <>
      <SideBar>
        <div>
          <Button onClick={() => setOpen(true)}>일지 작성</Button>
        </div>
        <UserDiaryListAdd open={open} setOpen={setOpen} setFilteredDiaries={setFilteredDiaries} filteredDiaries={filteredDiaries} />
        <ListContainer>
          강아지 선택
          <Items>
            {dogs.map((dog) => <Item key={dog.dogId} name="dogId" item={dog} filter={filter} onChange={onChange} />)}
          </Items>
        </ListContainer>
        <ListContainer>
          작성자 선택
          <ItemContainer>
            <Button value="USER" name="petsitterCheck" onClick={onChange}>반려인</Button>
            <Button value="PETSITTER" name="petsitterCheck" onClick={onChange}>펫시터</Button>
          </ItemContainer>
        </ListContainer>
        <ListContainer>
          카테고리 선택
          {categories.map((category) => <Item key={category.categoryId} name="categoryId" item={category} filter={filter} onChange={onChange} />)}
        </ListContainer>
      </SideBar>
    </>
  );
}

export default UserSideBar;
