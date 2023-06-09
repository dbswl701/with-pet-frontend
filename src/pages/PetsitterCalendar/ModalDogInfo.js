import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function ModalDogInfo({ open, setOpen, dogInfo }) {
  // const list = [
  //   {
  //     name: '강아지 이름',
  //     value: dogInfo.dogName,
  //   },
  //   {
  //     name: '강아지 이름',
  //     value: dogInfo.dogName,
  //   },
  //   {
  //     name: '강아지 이름',
  //     value: dogInfo.dogName,
  //   },
  //   {
  //     name: '강아지 이름',
  //     value: dogInfo.dogName,
  //   },
  //   {
  //     name: '강아지 이름',
  //     value: dogInfo.dogName,
  //   },
  // ];

  const print = (
    <div className="diary_container">
      {dogInfo.dogName}
    </div>
  );
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} style={{ margin: '40px' }}>
        <Box
          sx={{
            width: 800,
            height: 550,
            // maxHeight: '80vh',
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
          { print }
          <Button type="button" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalDogInfo;
