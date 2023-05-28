import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { CancelButton } from './InfoStyle';

function PetsitterInfoModifyHashTag({ hashTags, setHashTags }) {
  const [hashTag, setHashTag] = useState('');
  const onRemoveHashtag = (id) => {
    // 해시태그 하나 삭제
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
        console.log(res.data.result);
        // eslint-disable-next-line no-alert
        alert(res.data.result);
      })
      .catch(() => {});
  };
  return (
    <>
      <p>해시태그</p>
      <div style={{ display: 'flex', flexDirection: 'start' }}>
        {hashTags && hashTags.map((tag) => (
          <div className="list" key={tag.hashTagName} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
            #{tag.hashTagName}&ensp;
            {/* <span># {tag.hashTagName}</span> */}
            {/* <input type="button" value="x" onClick={() => onRemoveHashtag(tag.petSitterHashTagId)} /> */}
            <CancelButton className="cancel" value="X" onClick={() => onRemoveHashtag(tag)}>X</CancelButton>&ensp;
          </div>
        ))}
      </div>
      <TextField sx={{ m: 1 }} variant="outlined" size="small" name="hashTagName" onChange={(e) => setHashTag(e.target.value)} value={hashTag} />
      {/* <TextField sx={{ m: 1 }} label="해시태그" variant="outlined" size="small" name="hashTagName" onChange={(e) => setHashTag(e.target.value)} value={hashTag} /> */}
      <input type="button" onClick={handleHashtag} value="추가" />
      <button onClick={onSubmit}>저장하기</button>
      {/* <Button onClick={handleHashtag} value="추가">추가</Button> */}
    </>
  );
}

export default PetsitterInfoModifyHashTag;
