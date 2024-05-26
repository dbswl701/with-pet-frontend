import React from 'react';
import { TextField } from '@mui/material';
import * as S from '../PetsitterInfoManage.styles';

function HashTagUpdate({
  hashTags, handleHashtag, onRemoveHashtag, setHashTag, hashTag,
}) {
  return (
    <div>
      <S.Title>해시태그</S.Title>
      <div style={{ display: 'flex', flexDirection: 'start' }}>
        {hashTags && hashTags.map((tag) => (
          <div className="list" key={tag.hashTagName} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
            #{tag.hashTagName}&ensp;
            <S.CancelButton type="button" className="cancel" value="X" onClick={() => onRemoveHashtag(tag)} />&ensp;
          </div>
        ))}
      </div>
      <TextField sx={{ m: 1 }} variant="outlined" size="small" name="hashTagName" onChange={(e) => setHashTag(e.target.value)} value={hashTag} />
      <S.InputButton type="button" onClick={handleHashtag} value="추가" />
    </div>
  );
}

export default HashTagUpdate;
