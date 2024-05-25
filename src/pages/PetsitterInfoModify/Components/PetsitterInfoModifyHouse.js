import React from 'react';
import { CancelButton, Button, LabelContainer } from '../../PetsitterInfoManage/InfoStyle';
import PostFileUpload from '../../../services/upload';
import { putPetsitterHouseImg } from '../../../services/petsitter';

function PetsitterInfoModifyHouse({ houseImgList, setHouseImgList }) {
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    const res = await PostFileUpload(formData);
    res.data.result.forEach((img) => {
      const temp = { petSitterHouseRepresentative: houseImgList.length === 0, petSitterHouseImg: img };
      setHouseImgList((prevImages) => [...prevImages, temp]);
    });
  };

  console.log('이미지: ', houseImgList);
  const onRemoveHousImg = (id) => {
    const removeHouseImg = houseImgList.filter((img) => (img.petSitterHouseImg === id));
    const updateHouseImg = houseImgList.filter((img) => (img.petSitterHouseImg !== id));

    if (removeHouseImg[0].petSitterHouseRepresentative === true) {
      setHouseImgList(updateHouseImg.map((img, index) => {
        if (index === 0) {
          return { ...img, petSitterHouseRepresentative: true };
        }
        return img;
      }));
    }
  };

  const onSubmit = async () => {
    const res = await putPetsitterHouseImg(houseImgList);
    // eslint-disable-next-line no-alert
    alert(res.data.result);
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {
          houseImgList && houseImgList.map((img, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <img
                key={img.petSitterHouseImg}
                src={img.petSitterHouseImg}
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
