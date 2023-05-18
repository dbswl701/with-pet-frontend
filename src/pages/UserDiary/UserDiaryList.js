import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import axios from 'axios';
import UserDiary from './UserDiary';
import UserDiaryAdd from './UserDiaryAdd';
import dogimgdefault from '../../assets/dogProfileImage.png';
import './Diaries.css';
// function UserDiaryList(props)
function UserDiaryList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [diaries, setDiaries] = useState([]);
  const dateNow = new Date();
  const today = dateNow.toISOString().substr(0, 10);
  const [categoryId, setCategoryId] = useState('');
  const [day, setDay] = useState('2023-05-17'); //캘린더뷰에서 선택한 날짜 받아오기. 지금은 임시로 2023-05-17로 설정
  const [dogId, setDogId] = useState('');
  const [diaryInfo, setDiaryInfo] = useState({
    categoryId: 1,
    contentBody: '',
    createdAt: dayjs(today),
    dogId: 1,
    media: '',
    title: '',
  });

  // setDay(props);
  // setDogId(props);

  const onChangetemp = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDiaryInfo({
          ...diaryInfo,
          media: reader.result,
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
    let media = diaryInfo.media;
    if (media === '') {
      media = dogimgdefault;
    }
    const diary = {
      categoryId: diaryInfo.categoryId,
      contentBody: diaryInfo.contentBody,
      createdAt: diaryInfo.createdAt,
      dogId: diaryInfo.dogId,
      dogImgToday: media,
      title: diaryInfo.title,
    };
    console.log(diary);
    axios
      .post(`https://withpet.site/api/v1/userdiaries`, diary, {
        withCredentials: true,
      })
      .then((res) => {
        setDiaries(diaries.concat(res.data.result));
      })
      .catch((err) => {
        console.error(err);
      });
    setDiaryInfo({
      categoryId: 0,
      contentBody: '',
      createdAt: '',
      dogId: 0,
      media: '',
      title: '',
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://withpet.site/api/v1/userdiaries/day?categoryId=${categoryId}&day=${day}&dogId=${dogId}`,
        { withCredentials: true },
      )
      .then((res) => {
        setDiaries(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onSubmitModify = (id, modifyDiaryInfo) => {
    // setPets(pets.map((pet) => (pet.id === id ? modifyPetInfo : pet)));
    let diaryRequest = modifyDiaryInfo;
    axios
      .put(`https://withpet.site/api/v1/userdiaries/${id}`, diaryRequest, {
        withCredentials: true,
      })
      .then((res) => {
        const updatedDiaries = diaries.map((diary) => {
          if (diary.id === modifyDiaryInfo.id) {
            return res.data.result;
          }
          return diary;
        });
        setDiaries(updatedDiaries); //새로고침 없이 렌더링 됨
      })
      .catch(() => {});
  };

  const onCancel = () => {
    setDiaryInfo({
      categoryId: '',
      contentBody: '',
      createdAt: '',
      dogId: '',
      media: '',
      title: '',
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        작성
      </Button>
      <Modal open={open} onClose={handleClose} style={{ margin: '40px' }}>
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
            {diaries.map((diary) => {
              return (
                <div>
                  <UserDiary diary={diary} onSubmitModify={onSubmitModify} />
                </div>
              );
            })}
            <UserDiaryAdd
              onSubmit={onSubmitAdd}
              onChange={onChangetemp}
              diaryInfo={diaryInfo}
              onCancel={onCancel}
              setDiaryInfo={setDiaryInfo}
            />
            {/*여기에 UserDiaryAdd */}
          </div>
          <Button type="button" onClick={handleClose}>
            닫기
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default UserDiaryList;
