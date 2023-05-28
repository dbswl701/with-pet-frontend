import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
  // const [info, setInfo] = useState({});

  // 해시태그(petSitterHashTags)
  // const [hashTags, setHashTags] = useState([]);
  // const [hashTag, setHashTag] = useState('');

  // 소개글(introduction)
  // const [introduction, setIntroduction] = useState('');

  // 펫시터 집사진(petSitterHouseRequests)
  const [houseImgList, setHouseImgList] = useState([]);

  // 펫시텃 서비스
  // const [serviceSelectList, setServiceSelectList] = useState([]);

  // 필수 서비스
  // const [criticalServices, setCriticalServices] = useState([]);

  // 자격증 사진
  // const [petSitterLicenseImg, setPetSitterLicenseImg] = useState('');

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
    console.log(id);
    setHouseImgList(houseImgList.filter((img) => (img.houseImg !== id)));
  };

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/petsitter/show-myinfo', { withCredentials: true })
      .then((res) => {
        // setInfo(res.data.result);
        setHouseImgList(res.data.result.petSitterHouses);
        console.log(res.data.result.petSitterHouses);
        // setCriticalServices(res.data.result.petSitterCriticalServices);
        // setServiceSelectList(res.data.result.petSitterServices);
        // setPetSitterLicenseImg(res.data.result.petSitterLicenseImg);
      })
      .catch(() => {
      });
  }, []);
  console.log(houseImgList);

  const onSubmit = () => {
    axios.put('https://withpet.site/api/v1/petsitter/update-houses', { petSitterHousesRequests: houseImgList }, { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        // eslint-disable-next-line no-alert
        alert(res.data.result);
      })
      .catch(() => {});
  };
  const houseImg = (
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
