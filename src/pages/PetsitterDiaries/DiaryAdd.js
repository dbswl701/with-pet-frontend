import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// import axios from 'axios';
import Typography from '@mui/material/Typography';
import dogimgdefault from '../../assets/dogProfileImage.png';

function DiaryAdd({
  onSubmit, onChange, petInfo, onCancle,
}) {
  const [isClick, setisClick] = useState(false);
  const onLocalSubmit = (e) => {
    onSubmit(e);
    setisClick(false);
  };

  const onLocalCancle = () => {
    onCancle();
    setisClick(false);
  };

  const addinfo = (
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
          <input className="pet-add-btn" type="submit" value="submit" />
          <input
            className="pet-add-btn pet-add-cancel-btn"
            type="button"
            value="cancel"
            onClick={onLocalCancle}
          />
        </div>
      </div>
    </form>
  );

  return (
    <div className={`${!isClick ? 'pet-add' : 'pet-detail'}`}>
      {isClick !== true ? (
        <AddCircleOutlineIcon
          fontSize="large"
          onClick={() => {
            setisClick(true);
          }}
        />
      ) : (
        addinfo
      )}
    </div>
  );
}

export default DiaryAdd;
