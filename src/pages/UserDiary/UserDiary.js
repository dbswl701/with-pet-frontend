import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

const url = 'https://withpet.site/api/v1/userdiaries';

function UserDiary() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryID, setCategoryID] = useState('');
  const [userDiaries, setUserDiaries] = useState([]);
  const [dogID, setDogID] = useState('');

  useEffect(() => {
    axios.get(url, { withCredentials: true })
      .then((res) => {
        setCreatedAt(res.data);
        setDogID(res.data.dogId);
        setUserDiaries(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const hendleContentBodyChange = (e) => {
    setContentBody(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategoryID(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('createdAt', createdAt);
    formData.append('title', title);
    formData.append('contentBody', contentBody);
    formData.append('dogImgToday', selectedFile);
    formData.append('dogID', dogID);
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        handleClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        날짜버튼
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          width: 800,
          height: 'flex',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.paper',
          boxShadow: 24,
          margin: 'auto',
          p: 2,
        }}
        >
          <Typography variant="h5" gutterBottom>
            {createdAt ? `Diary created on ${createdAt}` : '(선택 날짜 안뜸)'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            반려견: {dogID}
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">카테고리</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={categoryID}
              label="Category"
              onChange={handleCategoryChange}
            >
              {userDiaries.map((diary) => (
                <MenuItem key={diary.id} value={diary.id}>{diary.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} /><br /><br />
            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="preview"
                width="200"
              />
            )}<br />
            <TextField
              label="제목"
              value={title}
              onChange={handleTitleChange}
              sx={{ mb: 2 }}
            /><br />
            <TextField
              label="내용"
              multiline
              rows={6}
              value={contentBody}
              onChange={hendleContentBodyChange}
            /><br />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              등록하기
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default UserDiary;
