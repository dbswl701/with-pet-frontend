import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import dayjs from 'dayjs';
import axios from 'axios';
import UserDiary from './UserDiary';
// import UserDiaryAdd from './UserDiaryAdd';
import './Diaries.css';
// function UserDiaryList(props)
function UserDiaryList({ open, setOpen, dayInfo }) {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [diaries, setDiaries] = useState([]);
  // const dateNow = new Date();
  // const today = dateNow.toISOString().substr(0, 10);
  // const [diaryInfo, setDiaryInfo] = useState({
  //   categoryId: 1,
  //   contentBody: '',
  //   createdAt: dayjs(today),
  //   dogId: 1,
  //   dogImgToday: '',
  //   title: '',
  // });

  // setDay(props);
  // setDogId(props);

  // const onChangetemp = (e) => {
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setDiaryInfo({
  //         ...diaryInfo,
  //         dogImgToday: reader.result,
  //       });
  //     };
  //   } else {
  //     const { value, name } = e.target;
  //     setDiaryInfo({
  //       ...diaryInfo,
  //       [name]: value,
  //     });
  //   }
  // };

  // const onSubmitAdd = (e) => {
  //   e.preventDefault();
  //   const diary = {
  //     categoryId: diaryInfo.categoryId,
  //     contentBody: diaryInfo.contentBody,
  //     createdAt: diaryInfo.createdAt,
  //     dogId: diaryInfo.dogId,
  //     dogImgToday: diaryInfo.dogImgToday,
  //     title: diaryInfo.title,
  //   };
  //   console.log(diary);
  //   axios
  //     .post('https://withpet.site/api/v1/userdiaries', diary, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setDiaries(diaries.concat(res.data.result));
  //       console.log(res.data.result);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  //   setDiaryInfo({
  //     categoryId: 1,
  //     contentBody: '',
  //     createdAt: '',
  //     dogId: 1,
  //     dogImgToday: '',
  //     title: '',
  //   });
  // };
  // console.log(dayInfo);
  useEffect(() => {
    // console.log(dayInfo);
    // console.log(dayInfo.day);
    axios.get(`https://withpet.site/api/v1/userdiaries/day?categoryId=${dayInfo.categoryId}&day=${dayInfo.day}&dogId=${dayInfo.dogId}&petsitterCheck=${dayInfo.petsitterCheck}`, { withCredentials: true })
    // axios.get('https://withpet.site/api/v1/userdiaries/day?categoryId=&day=2023-05-20&dogId=', { withCredentials: true })
      .then((res) => {
        setDiaries(res.data.result);
        // console.log(res.data.result);
      })
      .catch(() => {
        // console.error(err);
      });
  }, [dayInfo]);

  const onSubmitModify = (id, modifyDiaryInfo) => {
    // setPets(pets.map((pet) => (pet.id === id ? modifyPetInfo : pet)));
    // const diaryRequest = modifyDiaryInfo;
    axios
      .put(`https://withpet.site/api/v1/userdiaries/${id}`, modifyDiaryInfo, {
        withCredentials: true,
      })
      .then((res) => {
        const updatedDiaries = diaries.map((diary) => {
          if (diary.userDiaryId === id) {
            return res.data.result;
          }
          return diary;
        });
        setDiaries(updatedDiaries); // 새로고침 없이 렌더링 됨
      })
      .catch(() => {});
  };

  // const onCancel = () => {
  //   setDiaryInfo({
  //     categoryId: '',
  //     contentBody: '',
  //     createdAt: '',
  //     dogId: '',
  //     dogImgToday: '',
  //     title: '',
  //   });
  // };

  return (
    <div>
      {/* <button style={{ width: '256px' }} onClick={() => setOpen(true)}>일지 작성</button> */}
      {/* <Button variant="contained" onClick={() => setOpen(true)}>
        작성
      </Button> */}
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
            {diaries.map((diary) => {
              return <UserDiary key={diary.userDiaryId} diary={diary} onSubmitModify={onSubmitModify} />;
            })}
            {/* <UserDiaryAdd
              onSubmit={onSubmitAdd}
              onChange={onChangetemp}
              diaryInfo={diaryInfo}
              onCancel={onCancel}
              setDiaryInfo={setDiaryInfo}
            /> */}
            {/* 여기에 UserDiaryAdd */}
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
