import React from 'react';
import axios from 'axios';
import { CancelButton, Button, LabelContainer } from './InfoStyle';

function PetsitterInfoModifyHouse({ houseImgList, setHouseImgList }) {
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.post('https://withpet.site/api/v1/file/upload', formData, config)
      .then((res) => {
        res.data.result.forEach((img) => {
          const temp = { houseId: 0, representative: houseImgList.length === 0, houseImg: img };
          setHouseImgList((prevImages) => [...prevImages, temp]);
        });
      });
  };
  const onRemoveHousImg = (id) => {
    const removeHouseImg = houseImgList.filter((img) => (img.houseImg === id));
    const updateHouseImg = houseImgList.filter((img) => (img.houseImg !== id));

    if (removeHouseImg[0].representative === true) {
      setHouseImgList(updateHouseImg.map((img, index) => {
        if (index === 0) {
          return { ...img, representative: true };
        }
        return img;
      }));
    }
  };

  const onSubmit = () => {
    axios.put('https://withpet.site/api/v1/petsitter/update-houses', { petSitterHousesRequests: houseImgList }, { withCredentials: true })
      .then((res) => {
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
              <img
                key={img.houseImg}
                src={img.houseImg}
                alt="집사진"
                style={{
                  width: '200px', height: '200px', border: index === 0 ? '5px solid rgba(202, 169, 105, .5)' : 'none', borderRadius: '10px', margin: '10px',
                }}
              />
              <CancelButton style={{ marginLeft: '10px' }} type="button" className="cancel" value="X" onClick={() => onRemoveHousImg(img.houseImg)} />
              { index === 0 ? <p>대표사진</p> : <p> </p>}
            </div>
          ))
        }
      </div>
      <>
        <input id="file" multiple style={{ visibility: 'hidden' }} type="file" accept="image/*" onChange={handleImageUpload} />
        <LabelContainer htmlFor="file">추가</LabelContainer>
        <Button style={{ width: '100px', height: '40px' }} className="submit" onClick={onSubmit}>저장</Button>
      </>
    </>
  );
}
export default PetsitterInfoModifyHouse;
