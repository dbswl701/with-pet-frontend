import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { CancelButton, InputButton, Button } from './InfoStyle';

function PetsitterInfoModifyHashTag({ hashTags, setHashTags }) {
  const [hashTag, setHashTag] = useState('');
  const onRemoveHashtag = (id) => {
    setHashTags(hashTags.filter((tag) => (tag !== id)));
  };
  const handleHashtag = () => {
    if (hashTags.includes(hashTag)) {
      // console.log('중복된 값입니다.');
    } else {
      setHashTags([...hashTags, { petSitterHashTagId: 0, hashTagName: hashTag }]);
    }
    setHashTag('');
  };
  const onSubmit = () => {
    axios.put('https://withpet.site/api/v1/petsitter/update-hashtags', { petSitterHashTagRequests: hashTags }, { withCredentials: true })
      .then((res) => {
        // eslint-disable-next-line no-alert
        alert(res.data.result);
      })
      .catch(() => {});
  };
  return (
    <>
      <p>해시태그</p>
      <div style={{ display: 'flex', flexDirection: 'start', position: 'ablosute' }}>
        {hashTags && hashTags.map((tag) => (
          <div
            className="list"
            key={tag.hashTagName}
            style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '20px',
            }}
          >
            #{tag.hashTagName}&ensp;
            <CancelButton type="button" className="cancel" value="X" onClick={() => onRemoveHashtag(tag)} />&ensp;
          </div>
        ))}
      </div>
      <div style={{ display: 'block', justifyContent: 'flex-end', position: 'relative' }}>
        <TextField
          inputProps={{
            style: {
              height: '35px', width: '300px', fontSize: '15px', padding: '0px', border: '1px solid #c4c4c4', borderRadius: '5px',
            },
          }}
          sx={{ m: 1 }}
          size="small"
          name="hashTagName"
          onChange={(e) => setHashTag(e.target.value)}
          value={hashTag}
        />
        <InputButton type="button" onClick={handleHashtag} value="추가" />
      </div>
      <Button onClick={onSubmit}>저장</Button>
    </>
  );
}

export default PetsitterInfoModifyHashTag;
