import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import UserDiary from './UserDiary';
import './Diaries.css';

function UserDiaryList({
  open, setOpen, diaries, setDiaries,
}) {
  const onSubmitModify = (id, modifyDiaryInfo) => {
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
        setDiaries(updatedDiaries);
      })
      .catch(() => {});
  };
  const handleRemove = (diaryId, petsitterId) => {
    if (petsitterId === null) {
      axios.delete(`https://withpet.site/api/v1/userdiaries/${diaryId}`, { withCredentials: true })
        .then(() => {
          setDiaries((prev) => prev.filter((item) => item.userDiaryId !== diaryId));
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            // eslint-disable-next-line no-alert
            alert('일지는 작성자만 삭제할 수 있습니다.');
          }
        });
    } else {
      axios.delete(`https://withpet.site/api/v1//api/v1/petsitter-diaries/${diaryId}`, { withCredentials: true })
        .then(() => {
          setDiaries((prev) => prev.filter((item) => item.userDiaryId !== diaryId));
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            // eslint-disable-next-line no-alert
            alert('일지는 작성자만 삭제할 수 있습니다.');
          }
        });
    }
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} style={{ margin: '40px' }}>
        <Box
          sx={{
            width: 800,
            height: 550,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 24,
            margin: 'auto',
            overflowY: 'scroll',
            p: 2,
            backgroundColor: '#FAF6F0',
          }}
        >
          <div className="diary_container">
            {diaries.map((diary) => {
              return <UserDiary key={diary.userDiaryId} diary={diary} onSubmitModify={onSubmitModify} handleRemove={handleRemove} />;
            })}
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
