import React, { useState, useEffect } from "react";
import * as S from "../PetsitterInfoManage.styles";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import {
  IPetSitterHashTags,
  IUpdatedInfo,
} from "../../PetsitterInfoModify/types/petsitter.types";

interface IProps {
  setValue: UseFormSetValue<IUpdatedInfo>;
  errors: FieldErrors<IUpdatedInfo>;
  value: IPetSitterHashTags[];
}

interface INewValue {
  petSitterHashTagName: string;
}
function HashTagUpdate({ setValue, errors, value }: IProps) {
  // react-hook-form을 써서 state 제거 가능.
  const [hashTag, setHashTag] = useState("");
  const [hashTags, setHashTags] = useState<INewValue[]>([]);

  useEffect(() => {
    if (value) {
      // 정보 가공
      const newList = value.map((tag) => {
        return { petSitterHashTagName: tag.petSitterHashTagName };
      });
      setHashTags(newList);
    }
  }, [value]);

  const handleHashtag = () => {
    // 중복되는게 있는지 확인
    const newTagList = hashTags.filter((tag) => {
      tag.petSitterHashTagName === hashTag;
    });
    if (newTagList.length === 0) {
      const newTags = [...hashTags, { petSitterHashTagName: hashTag }];
      setHashTags(newTags);
      setHashTag("");
      setValue("petSitterHashTags", newTags, { shouldValidate: true });
    }
  };
  const onRemoveHashtag = (id: INewValue) => {
    const newTags = hashTags.filter((tag) => tag !== id);
    setHashTags(newTags);
    setValue("petSitterHashTags", newTags, { shouldValidate: true });
  };

  return (
    <div>
      <S.Title>해시태그</S.Title>
      <S.HashTagInput
        name="hashTagName"
        placeholder="# 해시태그를 입력하세요. (ex.best 펫시터)"
        onChange={(e) => setHashTag(e.target.value)}
        value={hashTag}
      />
      <S.HashTagButton type="button" onClick={handleHashtag} value="추가" />
      <S.HashTagList>
        {hashTags &&
          hashTags.map((tag) => (
            <S.HashTagItem className="list" key={tag.petSitterHashTagName}>
              <S.HashTag># {tag.petSitterHashTagName}</S.HashTag>
              <S.HasTagCancleBtn
                type="button"
                value="X"
                onClick={() => onRemoveHashtag(tag)}
              />
            </S.HashTagItem>
          ))}
        {errors.petSitterHashTags && (
          <S.ErrorMsg>{errors.petSitterHashTags.message}</S.ErrorMsg>
        )}
      </S.HashTagList>
    </div>
  );
}

export default HashTagUpdate;
