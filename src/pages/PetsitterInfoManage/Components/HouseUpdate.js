/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import * as S from '../PetsitterInfoManage.styles';
import AddIcon from '../../../assets/AddIcon.png';
import PostFileUpload from '../../../services/upload';

function HouseUpdate({
  register, errors, setValue,
}) {
  const [houseImgList, setHouseImgList] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });
    const res = await PostFileUpload(formData);
    res.data.result.forEach((img, index) => {
      const temp = { petSitterHouseId: 0, petSitterHouseRepresentative: index === 0, petSitterHouseImg: img };
      const updatedList = [...houseImgList, temp];
      setHouseImgList(updatedList);
      setValue('houseImg', updatedList, { shouldValidate: true });
    });
  };
  const onRemoveHouseImg = (id) => {
    const removeHouseImg = houseImgList.filter((img) => (img.petSitterHouseImg === id));
    const updateHouseImg = houseImgList.filter((img) => (img.petSitterHouseImg !== id));
    setHouseImgList(updateHouseImg);
    setValue('houseImg', updateHouseImg, { shouldValidate: true });

    if (removeHouseImg[0].representative === true) {
      const temp = updateHouseImg.map((img, index) => {
        if (index === 0) {
          return { ...img, representative: true };
        }
        return img;
      });
      setHouseImgList(temp);
      setValue('houseImg', temp);
    }
  };
  return (
    <>
      <S.Title>집사진</S.Title>
      <S.HouseImgList>
        <S.HouseImgContainer>
          <S.HouseImgInput id="file" multiple type="file" {...register('houseImg', { required: true })} accept="image/*" onChange={handleImageUpload} />
          <S.HouseImgLabel htmlFor="file">
            <img src={AddIcon} alt="추가" />
          </S.HouseImgLabel>
        </S.HouseImgContainer>
        {
          houseImgList && houseImgList.map((img, index) => (
            <S.HouseImgContainer key={img}>
              <S.HouseImg key={img.petSitterHouseImg} src={img.petSitterHouseImg} alt="집사진" isRepresentative={index === 0} onClick={() => onRemoveHouseImg(img.petSitterHouseImg)} />
            </S.HouseImgContainer>
          ))
        }
      </S.HouseImgList>
      {/* 오류 출력 */}
      {
        errors.houseImg && <S.ErrorMsg>{errors.houseImg.message}</S.ErrorMsg>
      }
    </>
  );
}

export default HouseUpdate;
