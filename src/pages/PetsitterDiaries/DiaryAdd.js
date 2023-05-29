import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// import axios from 'axios';
import Typography from '@mui/material/Typography';
import dogimgdefault from '../../assets/dogProfileImage.png';

function DiaryAdd({
  onSubmit, onChange, petInfo, onCancle, categories,
}) {
  const [isClick, setisClick] = useState(false);
  // const [categories, setCategories] = useState([]);
  const onLocalSubmit = (e) => {
    onSubmit(e);
    setisClick(false);
  };

  const onLocalCancle = () => {
    onCancle();
    setisClick(false);
  };

  // useEffect(() => {
  //   axios.get('https://withpet.site/api/v1/category', { withCredentials: true })
  //     .then((res) => {
  //       setCategories(res.data.result);
  //     });
  // }, []);

  const addinfo = (
    <form onSubmit={onLocalSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="pet-info-regist">
            <Typography>{petInfo.createdAt}</Typography>
            <TextField
              sx={{ m: 1 }}
              select
              label="카테고리"
              variant="outlined"
              name="categoryId"
              onChange={onChange}
              value={petInfo.categoryId}
              size="small"
              required
            >
              { categories && categories.map((category) => <MenuItem key={category.categoryId} value={category.categoryId}>{category.name}</MenuItem>)}
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
              name="contentBody"
              onChange={onChange}
              value={petInfo.contentBody}
              required
            />
          </div>
          <div className="pet-img-regist">
            <img
              alt="이미지 미리보기"
              src={!petInfo.dogImgToday ? dogimgdefault : petInfo.dogImgToday}
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
