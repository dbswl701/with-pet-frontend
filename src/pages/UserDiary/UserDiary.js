import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

function UserDiary() {
  const [open, setOpen] = useState(false);
  const [diaryContent, setDiaryContent] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log(diaryContent);
    handleClose();
  };

  const handleDiaryContentChange = (event) => {
    setDiaryContent(event.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen}>캘린더 뷰 특정 날짜</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 20,
        }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            (날짜)
          </Typography>
          <TextField
            id="diary-content"
            label="일지 작성"
            multiline
            rows={4}
            value={diaryContent}
            onChange={handleDiaryContentChange}
            sx={{ mt: 2 }}
          />
          <Button onClick={handleSave} open sx={{ mt: 2 }}>저장</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default UserDiary;
