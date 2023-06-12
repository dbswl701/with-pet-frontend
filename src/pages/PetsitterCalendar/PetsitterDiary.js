import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import dogimgdefault from '../../assets/dogProfileImage.png';

function PetsitterDiary({ id, setPrintBody }) {
  const [diaryInfo, setDiaryInfo] = useState({
    categoryId: '',
    contentBody: '',
    createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
    dogId: id,
    dogImgToday: '',
    title: '',
  });
  const [categories, setCategories] = useState([]);

  const onChangetemp = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDiaryInfo({
          ...diaryInfo,
          dogImgToday: reader.result,
        });
      };
    } else {
      const { value, name } = e.target;
      setDiaryInfo({
        ...diaryInfo,
        [name]: value,
      });
    }
  };

  const onSubmitAdd = (e) => {
    e.preventDefault();
    axios.post('https://withpet.site/api/v1/petsitter-diaries', diaryInfo, { withCredentials: true })
      .then(() => {
        // 캘린더뷰로 이동
        setPrintBody(['main', 0]);
      })
      .catch(() => {
      });
  };

  useEffect(() => {
    axios
      .get('https://withpet.site/api/v1/category', {
        withCredentials: true,
      })
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch(() => {
      });
  }, []);

  const addDiary = (
    <form onSubmit={onSubmitAdd}>
      <div style={{ textAlign: 'center' }}>
        <h1>{dayjs(new Date()).format('YYYY-MM-DD')}</h1>
      </div>
      <div>
        <TextField sx={{ m: 1 }} select label="카테고리 선택" variant="outlined" name="categoryId" style={{ width: '200px' }} onChange={onChangetemp} value={diaryInfo.categoryId} size="small" required>
          {categories.map((item) => (
            <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>))}
        </TextField>
      </div>

      <div className="today-img-regist">
        <img style={{ width: '400px', height: '400px' }} alt="이미지 미리보기" src={!diaryInfo.dogImgToday ? dogimgdefault : diaryInfo.dogImgToday} />
        <label htmlFor="image-select">오늘의 사진 선택</label>
        <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChangetemp} />
      </div>
      <div>
        <TextField sx={{ m: 1 }} label="제목" style={{ width: '500px' }} variant="outlined" size="small" name="title" onChange={onChangetemp} />
      </div>
      <div>
        <TextField sx={{ m: 1 }} label="내용" multiline style={{ width: '500px' }} variant="outlined" size="small" name="contentBody" onChange={onChangetemp} />
      </div>
      <input className="diary-add-btn" type="submit" value="submit" style={{ width: '500px' }} />
    </form>
  );

  return (
    <div style={{ display: 'flex', margin: 'auto', flexDirection: 'column' }}>
      <div>
        {addDiary}
      </div>
      <Button type="button">
        닫기
      </Button>
    </div>
  );
}

export default PetsitterDiary;
