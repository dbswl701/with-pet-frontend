import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import axios from 'axios';
import UserDiaryAdd from './UserDiaryAdd';
import './Diaries.css';

function UserDiaryList({ open, setOpen }) {
  const [diaries, setDiaries] = useState([]);
  const dateNow = new Date();
  const today = dateNow.toISOString().substr(0, 10);
  const [diaryInfo, setDiaryInfo] = useState({
    categoryId: 1,
    contentBody: '',
    createdAt: dayjs(today),
    dogId: 1,
    dogImgToday: '',
    title: '',
  });

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
    const diary = {
      categoryId: diaryInfo.categoryId,
      contentBody: diaryInfo.contentBody,
      createdAt: diaryInfo.createdAt,
      dogId: diaryInfo.dogId,
      dogImgToday: diaryInfo.dogImgToday,
      title: diaryInfo.title,
    };
    console.log(diary);
    axios
      .post('https://withpet.site/api/v1/userdiaries', diary, {
        withCredentials: true,
      })
      .then((res) => {
        setDiaries(diaries.concat(res.data.result));
        console.log(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
    setDiaryInfo({
      categoryId: '',
      contentBody: '',
      createdAt: '',
      dogId: '',
      dogImgToday: '',
      title: '',
    });
  };

  const onCancel = () => {
    setDiaryInfo({
      categoryId: '',
      contentBody: '',
      createdAt: '',
      dogId: '',
      dogImgToday: '',
      title: '',
    });
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} style={{ margin: '40px' }}>
        <Box
          sx={{
            width: 800,
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 24,
            margin: 'auto',
            overflow: 'scroll',
            p: 2,
          }}
        >
          <div className="diary_container">
            <UserDiaryAdd
              onSubmit={onSubmitAdd}
              onChange={onChangetemp}
              diaryInfo={diaryInfo}
              onCancel={onCancel}
              setDiaryInfo={setDiaryInfo}
            />
          </div>
          <Button type="button" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default UserDiaryList;
