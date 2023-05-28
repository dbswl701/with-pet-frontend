import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import dogimgdefault from '../../assets/dogProfileImage.png';

function PetModify({ onSubmit, petInfo, onToggle }) {
  const [modifyPetInfo, setModifyPetInfo] = useState({
    dog_name: petInfo.dog_name,
    dog_breed: petInfo.dog_breed,
    dog_birth: petInfo.dog_birth,
    dog_gender: petInfo.dog_gender,
    neutralization: petInfo.neutralization ? 'true' : 'false',
    dog_weight: petInfo.dog_weight,
    dog_img: petInfo.dog_img,
    dog_isbn: petInfo.dog_isbn,
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
    onSubmit(petInfo.dog_id, modifyPetInfo);
  };

  const modify = (
    <form onSubmit={onLocalSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="pet-info-regist">
            <Typography>2023-05-12</Typography>
            <TextField
              sx={{ m: 1 }}
              select
              label="카테고리"
              variant="outlined"
              name="category"
              onChange={onChange}
              value={petInfo.category}
              size="small"
              required
            >
              <MenuItem value="산책1">산책1</MenuItem>
              <MenuItem value="산책2">산책2</MenuItem>
              <MenuItem value="산책3">산책3</MenuItem>
              <MenuItem value="산책4">산책4</MenuItem>
            </TextField>

            <TextField
              sx={{ m: 1 }}
              label="제목"
              variant="outlined"
              size="small"
              name="title"
              onChange={onChange}
              value={petInfo.title}
              required
            />

            <TextField
              sx={{ m: 1 }}
              label="내용"
              multiline
              variant="outlined"
              size="small"
              name="content"
              onChange={onChange}
              value={petInfo.content}
              required
            />
          </div>
          <div className="pet-img-regist">
            <img
              alt="이미지 미리보기"
              src={!petInfo.dog_img ? dogimgdefault : petInfo.dog_img}
            />
            <label htmlFor="image-select">사진 선택</label>
            <input
              type="file"
              accept="image/*"
              id="image-select"
              style={{ display: 'none' }}
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <input className="pet-add-btn" type="submit" value="수정" />
          <input
            className="pet-add-btn pet-add-cancel-btn"
            type="button"
            value="취소"
            onClick={() => onToggle('detail')}
          />
        </div>
      </div>
    </form>
  );
  return <>{modify}</>;
}

export default PetModify;
