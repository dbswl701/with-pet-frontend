import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
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
function PetsitterInfoModifyHouse({ houseImgList, setHouseImgList }) {
  // const [houseImgList, setHouseImgList] = useState([]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const imagePreview = ev.target.result;
        const temp = { houseId: 0, representative: houseImgList.length === 0, houseImg: imagePreview };
        setHouseImgList((prevImages) => [...prevImages, temp]);
      };
      reader.readAsDataURL(file);
    });
  };

  const onRemoveHousImg = (id) => {
    // 집 이미지 하나 삭제
    // console.log(id);
    setHouseImgList(houseImgList.filter((img) => (img.houseImg !== id)));
  };

  const onSubmit = () => {
    axios.put('https://withpet.site/api/v1/petsitter/update-houses', { petSitterHousesRequests: houseImgList }, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        // eslint-disable-next-line no-alert
        alert(res.data.result);
      })
      .catch(() => {});
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {
          houseImgList && houseImgList.map((img, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <img key={img.houseImg} src={img.houseImg} alt="집사진" style={{ width: '200px', height: '200px' }} />
              {/* <input type="button" value="x" /> */}
              <CancelButton className="cancel" value="X" onClick={() => onRemoveHousImg(img.houseImg)}>X</CancelButton>
              { index === 0 ? <p>대표사진</p> : <p> </p>}
            </div>
          ))
        }
        {/* </div> */}
      </div>
      <>
        <input id="file" multiple style={{ visibility: 'hidden' }} type="file" accept="image/*" onChange={handleImageChange} />
        <Label htmlFor="file">추가</Label>
        <button onClick={onSubmit}>저장하기</button>
      </>
    </>
  );
}
export default PetsitterInfoModifyHouse;
