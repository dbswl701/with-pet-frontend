import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import camera from '../../assets/camera.png';

import './Diaries.css';

function UserDiaryListAdd({
  open,
  setOpen,
  setFilteredDiaries,
  filteredDiaries,
}) {
  const dateNow = new Date();
  const today = dateNow.toISOString().substr(0, 10);
  const colorList = [
    '#64C8F3',
    '#F36464',
    '#57DF86',
    '#DFDA57',
    '#CAA969',
    'violet',
    'gray',
  ];

  const [diaryInfo, setDiaryInfo] = useState({
    categoryId: '',
    contentBody: '',
    createdAt: dayjs(today),
    dogId: '',
    dogImgToday: '',
    title: '',
  });
  const [categories, setCategories] = useState([]);
  const [dogs, setDogs] = useState([]);

  const handleImageUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post('https://withpet.site/api/v1/file/upload', formData, config)
      .then((res) => {
        setDiaryInfo({
          ...diaryInfo,
          dogImgToday: res.data.result[0],
        });
      });
  };
  const onChangetemp = (e) => {
    if (e.target.files) {
      handleImageUpload(e);
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
    axios
      .post('https://withpet.site/api/v1/userdiaries', diaryInfo, {
        withCredentials: true,
      })
      .then((res) => {
        const temp = {
          start: dayjs(new Date(res.data.result.createdAt)).format(
            'YYYY-MM-DD',
          ),
          end: dayjs(new Date(res.data.result.createdAt)).format('YYYY-MM-DD'),
          color: colorList[(res.data.result.dogId % colorList.length) - 1],
          title: res.data.result.dogName,
        };
        setFilteredDiaries(filteredDiaries.concat(temp));
      })
      .catch(() => {});

    axios
      .get(
        `https://withpet.site/api/v1/userdiaries/month?categoryId=&dogId=&month=${dayjs(
          new Date(),
        ).format('YYYY-MM')}&petsitterCheck=`,
        { withCredentials: true },
      )
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
      .catch(() => {});
    setDiaryInfo({
      categoryId: '',
      contentBody: '',
      createdAt: '',
      dogId: '',
      dogImgToday: '',
      title: '',
    });
    setOpen(false);
  };

  const onChangeCalendar = (date) => {
    const e = {
      target: {
        name: 'createdAt',
        value: dayjs(date).format('YYYY-MM-DD'),
      },
    };
    onChangetemp(e);
  };

  useEffect(() => {
    axios
      .get('https://withpet.site/api/v1/calendar', {
        withCredentials: true,
      })
      .then((res) => {
        setDogs(res.data.result.dogSimpleInfoResponses);
        setCategories(res.data.result.categoryResponses);
      })
      .catch(() => {});
  }, []);

  const addDiary = (
    <form onSubmit={onSubmitAdd}>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ m: 1 }}
                  label="날짜"
                  onChange={onChangeCalendar}
                  name="createdAt"
                  format="YYYY/MM/DD"
                  slotProps={{ textField: { size: 'small', length: 'small' } }}
                />
              </LocalizationProvider>
            </div>
            <div>
              <TextField
                sx={{ m: 1 }}
                select
                label="반려견 선택"
                variant="outlined"
                name="dogId"
                style={{ width: '132px' }}
                onChange={onChangetemp}
                value={diaryInfo.dogId}
                size="small"
                required
              >
                {dogs.map((item) => (
                  <MenuItem key={item.dogId} value={item.dogId}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                sx={{ m: 1 }}
                select
                label="카테고리 선택"
                variant="outlined"
                name="categoryId"
                style={{ width: '132px' }}
                onChange={onChangetemp}
                value={diaryInfo.categoryId}
                size="small"
                required
              >
                {categories.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div>
              <TextField
                sx={{ m: 1 }}
                label="제목"
                style={{ width: '282px' }}
                variant="outlined"
                size="small"
                name="title"
                onChange={onChangetemp}
              />
            </div>
          </div>
          <div style={{ marginLeft: '50px' }}>
            <div
              className="today-img-regist"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label htmlFor="image-select">
                <img
                  style={{
                    width: '150px',
                    height: '150px',
                    border: '1px solid gray',
                  }}
                  alt="이미지 미리보기"
                  src={!diaryInfo.dogImgToday ? camera : diaryInfo.dogImgToday}
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id="image-select"
                style={{ display: 'none' }}
                onChange={onChangetemp}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <TextField
              sx={{ m: 1 }}
              label="내용"
              multiline
              rows={6}
              style={{ width: '500px' }}
              variant="outlined"
              size="small"
              name="contentBody"
              onChange={onChangetemp}
            />
          </div>
        </div>
      </div>
      <input
        className="diary-add-btn"
        type="submit"
        value="저장"
        style={{ width: '510px' }}
      />
    </form>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{ margin: '40px' }}
      >
        <Box
          sx={{
            width: 800,
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 24,
            margin: 'auto',
            p: 2,
          }}
        >
          <div className="diary_container">{addDiary}</div>
          <Button type="button" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default UserDiaryListAdd;
