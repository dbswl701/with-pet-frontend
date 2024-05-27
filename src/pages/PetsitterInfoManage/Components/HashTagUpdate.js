import React from 'react';
import * as S from '../PetsitterInfoManage.styles';

function HashTagUpdate({
  hashTags, handleHashtag, onRemoveHashtag, setHashTag, hashTag,
}) {
  return (
    <div>
      <S.Title>해시태그</S.Title>
      <S.HashTagInput name="hashTagName" placeholder="# 해시태그를 입력하세요. (ex.best 펫시터)" onChange={(e) => setHashTag(e.target.value)} value={hashTag} />
      <S.HashTagButton type="button" onClick={handleHashtag} value="추가" />
      <S.HashTagList>
        {hashTags && hashTags.map((tag) => (
          <S.HashTagItem className="list" key={tag.hashTagName}>
            <S.HashTag># {tag.hashTagName}</S.HashTag>
            <S.HasTagCancleBtn type="button" value="X" onClick={() => onRemoveHashtag(tag)} />
          </S.HashTagItem>
        ))}
      </S.HashTagList>
    </div>
  );
}

export default HashTagUpdate;
