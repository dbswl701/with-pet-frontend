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
  // console.log(categories);
  // const addinfo = (
  //   <form onSubmit={onLocalSubmit}>
  //     <div style={{ display: 'flex', flexDirection: 'column' }}>
  //       <div style={{ display: 'flex', flexDirection: 'row' }}>
  //         <div className="pet-info-regist">
  //           <Typography>{petInfo.createdAt}</Typography>
  //           <TextField
  //             sx={{ m: 1 }}
  //             select
  //             label="카테고리"
  //             variant="outlined"
  //             name="categoryId"
  //             onChange={onChange}
  //             value={petInfo.categoryId}
  //             size="small"
  //             required
  //           >
  //             { categories && categories.map((category) => (
  //               <MenuItem key={category.categoryId} value={category.categoryId}>{category.name}</MenuItem>
  //             ))}
  //           </TextField>

  //           <TextField
  //             sx={{ m: 1 }}
  //             label="제목"
  //             variant="outlined"
  //             size="small"
  //             name="title"
  //             onChange={onChange}
  //             value={petInfo.title}
  //             required
  //           />

  //           <TextField
  //             sx={{ m: 1 }}
  //             label="내용"
  //             multiline
  //             variant="outlined"
  //             size="small"
  //             name="contentBody"
  //             onChange={onChange}
  //             value={petInfo.contentBody}
  //             required
  //           />
  //         </div>
  //         <div className="pet-img-regist">
  //           <img
  //             alt="이미지 미리보기"
  //             src={!petInfo.dogImgToday ? dogimgdefault : petInfo.dogImgToday}
  //           />
  //           <label htmlFor="image-select">사진 선택</label>
  //           <input
  //             type="file"
  //             accept="image/*"
  //             id="image-select"
  //             style={{ display: 'none' }}
  //             onChange={onChange}
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <input className="pet-add-btn" type="submit" value="submit" />
  //         <input
  //           className="pet-add-btn pet-add-cancel-btn"
  //           type="button"
  //           value="cancel"
  //           onClick={onLocalCancle}
  //         />
  //       </div>
  //     </div>
  //   </form>
  // );

  const addinfo = (
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
              >{petInfo.createdAt}
              </Typography>
              <TextField sx={{ m: 1 }} select label="카테고리 선택" variant="outlined" name="categoryId" style={{ width: '282px' }} onChange={onChange} value={petInfo.categoryId} size="small" required>
                { categories.map((item) => <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>)}
              </TextField>
            </div>

            <div>
              <TextField sx={{ m: 1 }} label="제목" value={petInfo.title} style={{ width: '282px' }} variant="outlined" size="small" name="title" onChange={onChange} />
            </div>
          </div>
          <div style={{ marginLeft: '50px' }}>
            <div className="today-img-regist" style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="image-select">
                <img style={{ width: '150px', height: '150px', border: '1px solid gray' }} alt="이미지 미리보기" src={!petInfo.dogImgToday ? dogimgdefault : petInfo.dogImgToday} />
              </label>
              <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} />
            </div>
          </div>
        </div>
        <div>
          <div>
            <TextField sx={{ m: 1 }} label="내용" value={petInfo.contentBody} multiline rows={6} style={{ width: '500px' }} variant="outlined" size="small" name="contentBody" onChange={onChange} />
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