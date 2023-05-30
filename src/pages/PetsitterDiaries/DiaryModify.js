import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
// import dogimgdefault from '../../assets/dogProfileImage.png';

function PetModify({
  onSubmit, petInfo, onToggle, categories,
}) {
  const [modifyPetInfo, setModifyPetInfo] = useState({
    categoryId: petInfo.categoryId,
    contentBody: petInfo.contentBody,
    createdAt: petInfo.createdAt,
    dogImgToday: petInfo.dogImgToday,
    title: petInfo.title,
  });
  const onChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setModifyPetInfo({
          ...modifyPetInfo,
          dog_img: reader.result,
        });
      };
    } else {
      const { value, name } = e.target;
      setModifyPetInfo({
        ...modifyPetInfo,
        [name]: value,
      });
    }
  };

  const onLocalSubmit = (e) => {
    e.preventDefault();
    onToggle('detail');
    setModifyPetInfo({
      ...modifyPetInfo,
      neutralization: modifyPetInfo.neutralization === 'true',
    });
    onSubmit(petInfo.petSitterDiaryId, modifyPetInfo);
  };
  console.log(petInfo);

  const onLocalCancle = () => {
    onToggle(false);
  };

  const modify = (
    <form onSubmit={onLocalSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <div>
              <Typography
                align="left"
                style={{
                  width: '200px', fontSize: '30px', marginBottom: '20px', marginLeft: '10px',
                }}
              >{modifyPetInfo.createdAt}
              </Typography>
              <TextField sx={{ m: 1 }} select label="카테고리 선택" variant="outlined" name="categoryId" style={{ width: '282px' }} onChange={onChange} value={modifyPetInfo.categoryId} size="small" required>
                { categories.map((item) => <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>)}
              </TextField>
            </div>

            <div>
              <TextField sx={{ m: 1 }} label="제목" value={modifyPetInfo.title} style={{ width: '282px' }} variant="outlined" size="small" name="title" onChange={onChange} />
            </div>
          </div>
          <div style={{ marginLeft: '50px' }}>
            <div className="today-img-regist" style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="image-select">
                <img style={{ width: '150px', height: '150px', border: '1px solid gray' }} alt="이미지 미리보기" src={modifyPetInfo.dogImgToday} />
              </label>
              <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} />
            </div>
          </div>
        </div>
        <div>
          <div>
            <TextField sx={{ m: 1 }} label="내용" value={modifyPetInfo.contentBody} multiline rows={6} style={{ width: '500px' }} variant="outlined" size="small" name="contentBody" onChange={onChange} />
          </div>
        </div>
        <input className="diary-add-btn" type="submit" value="저장" style={{ width: '510px' }} />
        <input
          className="pet-add-btn pet-add-cancel-btn"
          type="button"
          value="cancel"
          onClick={onLocalCancle}
        />
      </div>
    </form>
  );

  return <>{modify}</>;
}

export default PetModify;
