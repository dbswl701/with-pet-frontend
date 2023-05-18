import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

function UserDiaryModify({ onSubmit, diaryInfo, onToggle }) {
  const [modifyDiaryInfo, setModifyDiaryInfo] = useState({
    createdAt: diaryInfo.createdAt,
    categoryName: diaryInfo.categoryName,
    categoryId: diaryInfo.categoryId,
    title: diaryInfo.title,
    content: diaryInfo.content,
    media: diaryInfo.media,
    diaryId: diaryInfo.userDiaryId,
  });
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [dogs, setDogs] = useState([]);
  const [dogId, setDogId] = useState('');
  const styles = {
    formControl: {
      margin: '8px',
      minWidth: '120px',
    },
    select: {
      padding: '8px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
      outline: 'none',
    },
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

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleDogChange = (event) => {
    setDogId(event.target.value);
  };

  const [submitInfo, setSubmitInfo] = useState({
    categoryId: 2,
    contentBody: 'string',
    createdAt: '2023-05-17',
    dogId: 4,
    title: 'string',
  });
  const onChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setModifyDiaryInfo({
          ...modifyDiaryInfo,
          media: reader.result,
        });
      };
    } else {
      const { value, name } = e.target;
      setModifyDiaryInfo({
        ...modifyDiaryInfo,
        [name]: value,
      });
    }
  };
  const onLocalSubmit = (e) => {
    e.preventDefault();
    onToggle('detail');
    setModifyDiaryInfo({
      ...modifyDiaryInfo,
    });
    const updatedSubmitInfo = {
      categoryId: Number(modifyDiaryInfo.categoryId),
      contentBody: modifyDiaryInfo.content,
      createdAt: modifyDiaryInfo.createdAt,
      dogId: Number(modifyDiaryInfo.dogId),
      title: modifyDiaryInfo.title,
    };
    setSubmitInfo(updatedSubmitInfo);
    onSubmit(diaryInfo.userDiaryId, updatedSubmitInfo);
  };

  const onChangeCalendar = (date) => {
    const e = {
      target: {
        name: 'createdAt',
        value: dayjs(date).format('YYYY-MM-DD'),
      },
    };
    onChange(e);
  };
  const modify = (
    <form onSubmit={onLocalSubmit}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ m: 1 }}
          label="날짜"
          value={dayjs(modifyDiaryInfo.createdAt)}
          onChange={onChangeCalendar}
          name="createdAt"
          format="YYYY/MM/DD"
        />
      </LocalizationProvider>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        name="categoryId"
        value={categoryId}
        onChange={onChange}
      >
        {/* <InputLabel id="demo-simple-select-label">카테고리</InputLabel> */}
        <select
          name="categoryId"
          labelId="demo-simple-select-label"
          id="categoryId"
          value={categoryId}
          label="카테고리"
          style={styles.select}
          onChange={handleCategoryChange}
        >
          {categories.map((item) => (
            <option
              key={item.categoryId}
              value={item.categoryId}
              name="categoryId"
            >
              {item.name}
            </option>
          ))}
        </select>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        name="dogId"
        value={dogId}
        onChange={onChange}
      >
        {/* <InputLabel id="demo-simple-select-label">반려견</InputLabel> */}
        <select
          name="dogId"
          labelId="demo-simple-select-label"
          id="dogId"
          value={dogId}
          label="반려견"
          style={styles.select}
          onChange={handleDogChange}
        >
          {dogs.map((item) => (
            <option key={item.dogId} value={item.dogId} name="dogId">
              {item.name}
            </option>
          ))}
        </select>
      </FormControl>
      <div className="select-diary-type">
        <img id="preview-img" src={modifyDiaryInfo.media} alt="preview" />
        <label htmlFor="image-select">오늘의 사진 선택</label>
        <input
          type="file"
          accept="image/*"
          id="image-select"
          style={{ display: 'none' }}
          onChange={onChange}
        />
      </div>
      <div className="diary-contents-regist">
        {/* 카테고리 바꾸기 */}
        <TextField
          sx={{ m: 1 }}
          label="제목"
          variant="outlined"
          size="small"
          name="title"
          onChange={onChange}
          value={modifyDiaryInfo.title}
        />
        <TextField
          sx={{ m: 1 }}
          label="내용"
          variant="outlined"
          size="medium"
          name="content"
          onChange={onChange}
          value={modifyDiaryInfo.content}
        />
        <input className="diary-add-btn" type="submit" value="수정" />
        <input
          className="diary-add-btn diary-add-cancel-btn"
          type="button"
          value="취소"
          onClick={() => onToggle('detail')}
        />
      </div>
    </form>
  );
  return <>{modify}</>;
}
export default UserDiaryModify;
