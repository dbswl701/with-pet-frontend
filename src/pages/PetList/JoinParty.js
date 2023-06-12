import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import TextField from '@mui/material/TextField';

function JoinParty({
  open, setOpen, setGroupList, groupList,
}) {
  const [partyCode, setPartyCode] = useState('');

  const onJoinParty = () => {
    axios.post('https://withpet.site/api/v1/groups/member', { partyIsbn: partyCode }, { withCredentials: true })
      .then((res) => {
        setGroupList(groupList.concat(res.data.result));
        setOpen(false);
        setPartyCode('');
      })
      .catch(() => {
      });
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} style={{ margin: '40px' }}>
        <Box
          sx={{
            width: 500,
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 24,
            margin: 'auto',
            overflowY: 'scroll',
            p: 2,
            backgroundColor: '#FAF6F0',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField sx={{ m: 1 }} label="코드 입력" variant="standard" size="small" name="inviteCode" value={partyCode} onChange={(e) => setPartyCode(e.target.value)} />
            <input type="button" value="그룹 참여" onClick={onJoinParty} />
          </div>
          <Button type="button" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default JoinParty;
