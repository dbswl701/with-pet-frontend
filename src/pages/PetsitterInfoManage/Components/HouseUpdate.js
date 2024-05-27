import React from 'react';
import * as S from '../PetsitterInfoManage.styles';
import AddIcon from '../../../assets/AddIcon.png';

function HouseUpdate({ houseImgList, onRemoveHouseImg, handleImageUpload }) {
  return (
    <>
      <S.Title>집사진</S.Title>
      <S.HouseUpdateContainer>
        <S.HouseImgList>
          <S.HouseImgContainer>
            <S.HouseImgInput id="file" multiple type="file" accept="image/*" onChange={handleImageUpload} />
            <S.HouseImgLabel htmlFor="file">
              <img src={AddIcon} alt="추가" />
            </S.HouseImgLabel>
          </S.HouseImgContainer>
          {
            houseImgList && houseImgList.map((img, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <S.HouseImgContainer key={index}>
                <S.HouseImg key={img.petSitterHouseImg} src={img.petSitterHouseImg} alt="집사진" isRepresentative={index === 0} />
                <S.CancelButton type="button" className="cancel" value="X" onClick={() => onRemoveHouseImg(img.petSitterHouseImg)} />
              </S.HouseImgContainer>
            ))
          }
        </S.HouseImgList>
      </S.HouseUpdateContainer>
    </>
  );
}

export default HouseUpdate;
