import React from 'react';
import * as S from '../PetsitterInfoManage.styles';

function HouseUpdate({ houseImgList, onRemoveHouseImg, handleImageUpload }) {
  return (
    <div>
      <div style={{ flexDirection: 'row' }}>
        <S.Title>집사진</S.Title>
        {
        houseImgList && houseImgList.map((img, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <img key={img.petSitterHouseImg} src={img.petSitterHouseImg} alt="집사진" style={{ width: '200px', height: '200px' }} />
            &ensp;
            <S.CancelButton type="button" className="cancel" value="X" onClick={() => onRemoveHouseImg(img.petSitterHouseImg)} />
            { index === 0 ? <p>대표사진</p> : <p> </p>}
          </div>
        ))
      }
      </div>
      <div>
        <input id="file" multiple style={{ visibility: 'hidden' }} type="file" accept="image/*" onChange={handleImageUpload} />
        <S.Label htmlFor="file">이미지 추가</S.Label>
      </div>
    </div>
  );
}

export default HouseUpdate;
