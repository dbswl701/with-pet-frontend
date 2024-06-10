import React, { useState } from 'react';
import * as S from '../PetsitterInfoManage.styles';

function HashTagUpdate({
  setValue, errors,
}) {
  // react-hook-form을 써서 state 제거 가능.
  const [hashTag, setHashTag] = useState('');
  const [hashTags, setHashTags] = useState([]);

  const handleHashtag = () => {
    if (!hashTags.includes(hashTag)) {
      const newTags = [...hashTags, { petSitterhashTagId: 0, hashTagName: hashTag }];
      setHashTags(newTags);
      setHashTag('');
      setValue('hashTags', newTags, { shouldValidate: true });
    }
  };
  const onRemoveHashtag = (id) => {
    const newTags = hashTags.filter((tag) => (tag !== id));
    setHashTags(newTags);
    setValue('hashTags', newTags, { shouldValidate: true });
  };

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
        {
          errors.hashTags && <S.ErrorMsg>{errors.hashTags.message}</S.ErrorMsg>
        }
      </S.HashTagList>
    </div>
  );
}

export default HashTagUpdate;
