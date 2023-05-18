import React, { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
// UserDiaryList에 추가해야됨.
function UserDiaryAdd({ onSubmit, onChange, onCancel }) {
  const [isClick, setisClick] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  // const [categoryName, setCategoryName] = useState('');
  const [dogs, setDogs] = useState([]);

  const [dogId, setDogId] = useState('');
  // const [dogName, setDogName] = useState('');
  // const [temp, setTemp] = useState('');

  const onLocalSubmit = (e) => {
    onSubmit(e);
    setisClick(false);
  };
  const onChangeCalendar = (date) => {
    console.log(date);
    console.log(dayjs(date).format('YYYY-MM-DD'));
    const e = {
      target: {
        name: 'createdAt',
        value: dayjs(date).format('YYYY-MM-DD'),
      },
    };
    onChange(e);
  };

  const onLocalCancle = () => {
    onCancel();
    setisClick(false);
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
    // setCategoryName(event.target.name);
  };

  const handleDogChange = (event) => {
    setDogId(event.target.value);
  };

  useEffect(() => {
    // 카테고리 selectbox 불러오기
    axios
      .get('https://withpet.site/api/v1/category', {
        withCredentials: true,
      })
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // 반려견 selectbox 불러오기
    axios
      .get('https://withpet.site/api/v1/calendar', {
        withCredentials: true,
      })
      .then((res) => {
        setDogs(res.data.result.dogSimpleInfoResponses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addDiary = (
    <form onSubmit={onLocalSubmit}>
      <div className="select-diary-type">
        {/* <div>{console.log('asdasdf', categoryId)}</div> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ m: 1 }}
            label="날짜"
            // value={diaryInfo.createdAt}
            // value={new Date()}
            onChange={onChangeCalendar}
            name="createdAt"
            format="YYYY/MM/DD"
          />
        </LocalizationProvider>
      </div>
      <div>
        {/* 카테고리, 반려견 불러오기 */}
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          name="categoryId"
          value={categoryId}
          onChange={onChange}
        >
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            name="categoryId"
            labelId="demo-simple-select-label"
            id="categoryId"
            value={categoryId}
            label="카테고리"
            onChange={handleCategoryChange}
          >
            {categories.map((item) => (
              <MenuItem
                key={item.categoryId}
                value={item.categoryId}
                name="categoryId"
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">반려견</InputLabel>
          <Select
            name="dogId"
            labelId="demo-simple-select-label"
            id="dogId"
            value={dogId}
            label="반려견"
            onChange={handleDogChange}
          >
            {dogs.map((item) => (
              <MenuItem key={item.dogId} value={item.dogId}>
                {item.name}
              </MenuItem>
            ))}
            {/* {categories.map((category) => {
              <MenuItem key={category.categoryId} value={category.categoryId}>
                {category.name}
              </MenuItem>;
            })} */}
          </Select>
        </FormControl>
      </div>
      <div className="dogImgToday">
        <img
          id="preview-image"
          alt="이미지 미리보기"
          // src={diaryInfo.dogImgToday}
        />
        <label htmlFor="image-select">오늘의 사진 선택</label>
        <input
          type="file"
          accept="image/*"
          id="image-select"
          style={{ display: 'none' }}
          onChange={onChange}
        />
      </div>
      <div className="diary-content">
        <TextField
          sx={{ m: 1 }}
          label="제목"
          variant="outlined"
          size="small"
          name="title"
          onChange={onChange}
          // value={diaryInfo.title}
        />
        <TextField
          sx={{ m: 1 }}
          label="내용"
          variant="outlined"
          size="small"
          name="contentBody"
          onChange={onChange}
          // value={diaryInfo.contentBody}
        />
        <input className="diary-submit-button" type="submit" value="submit" />
        <input
          className="diary-cancel-button"
          type="button"
          value="cancel"
          onClick={onLocalCancle}
        />
      </div>
    </form>
  );

  return (
    <div className={`${!isClick ? 'diary-add' : 'diary-detail'}`}>
      {isClick !== true ? (
        <AddCircleOutlineIcon
          fontSize="large"
          onClick={() => {
            setisClick(true);
          }}
        />
      ) : (
        addDiary
      )}
    </div>
  );
}

export default UserDiaryAdd;
