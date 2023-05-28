import React, { useState } from 'react';
import styled from 'styled-components';
import PetsitterInfoModifySidebar from './PetsitterInfoModifySidebar';
import { CancelButton } from './InfoStyle';

const Label = styled.label`
height: 40px;
width: 100px;
margin-bottom: 10px;
background-color: #CAA969;
color: white;
box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
border: none;
border-radius: 5px;
`;
function PetsitterInfoModify() {
  const [houseImgList, setHouseImgList] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const imagePreview = ev.target.result;
        setHouseImgList((prevImages) => [...prevImages, imagePreview]);
      };
      reader.readAsDataURL(file);
    });
  };
  const onRemoveHousImg = (id) => {
    // 집 이미지 하나 삭제
    console.log(id);
    setHouseImgList(houseImgList.filter((img) => (img.houseId !== id)));
  };
  const houseImg = (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {
          houseImgList && houseImgList.map((img, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <img key={img} src={img} alt="집사진" style={{ width: '200px', height: '200px' }} />
              {/* <input type="button" value="x" /> */}
              <CancelButton className="cancel" value="X" onClick={() => onRemoveHousImg(img.houseId)}>X</CancelButton>
              { index === 0 ? <p>대표사진</p> : <p> </p>}
            </div>
          ))
        }
        {/* </div> */}
      </div>
      <>
        <input id="file" style={{ visibility: 'hidden' }} type="file" accept="image/*" onChange={handleImageChange} />
        <Label htmlFor="file">이미지 변경</Label>
      </>
    </>
  );
  const print = houseImg;
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <PetsitterInfoModifySidebar />
      <div style={{ margin: 'auto' }}>
        { print }
      </div>
    </div>
  );
}

export default PetsitterInfoModify;
