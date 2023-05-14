import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const url = 'http://localhost:8080/api/v1/userdiaries';

function UserDiary() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setCreatedAt(res.data.createdAt);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(url, { title, contentBody })
      .then((res) => {
        console.log(res.data);
        handleClose();
      })
      .catch((err) => {
        console.error(err);
      });
    // handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        특정날짜
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
          p: 2,
        }}
        >
          <Typography variant="h5" gutterBottom>
            {createdAt ? `Diary created on ${createdAt}` : 'Loading...'}
          </Typography>
          <form onSubmit={handleSubmit}>
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
              sx={{ mb: 2 }}
            /><br />
            <Button type="submit" variant="contained" color="primary">
              저장
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default UserDiary;
