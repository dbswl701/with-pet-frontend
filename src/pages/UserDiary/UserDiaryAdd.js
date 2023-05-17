import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
// import MenuItem from "@mui/material/MenuItem";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// UserDiaryList에 추가해야됨.
function UserDiaryAdd({ onSubmit, onChange, diaryInfo, onCancel }) {
  const [isClick, setisClick] = useState(false);
  const onLocalSubmit = (e) => {
    onSubmit(e);
    setisClick(false);
  };
  const onChangeCalendar = (date) => {
    console.log(date);
    console.log(dayjs(date).format('YYYY-MM-DD'));
    const e = {
      target: {
        name: 'createdAt',
        value: dayjs(date).format('YYYY-MM-DD'),
      },
    };
    onChange(e);
  };

  const onLocalCancle = () => {
    onCancel();
    setisClick(false);
  };

  const addDiary = (
    <form onSubmit={onLocalSubmit}>
      <div className="select-diary-type">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ m: 1 }}
            label="날짜"
            value={diaryInfo.createdAt}
            onChange={onChangeCalendar}
            name="createdAt"
            format="YYYY/MM/DD"
          />
        </LocalizationProvider>
        {/* 카테고리, 반려견 불러오기 */}
      </div>
      <div className="dogImgToday">
        <img
          id="preview-image"
          alt="이미지 미리보기"
          src={diaryInfo.dogImgToday}
        />
        <label htmlFor="image-select">오늘의 사진 선택</label>
        <input
          type="file"
          accept="image/*"
          id="image-select"
          style={{ display: 'none' }}
          onChange={onChange}
        />
      </div>
      <div className="diary-content">
        <TextField
          sx={{ m: 1 }}
          label="제목"
          variant="outlined"
          size="small"
          name="title"
          onChange={onChange}
          value={diaryInfo.title}
          required
        />
        <TextField
          sx={{ m: 1 }}
          label="내용"
          variant="outlined"
          size="small"
          name="content"
          onChange={onChange}
          value={diaryInfo.contentBody}
          required
        />
        <input className="diary-submit-button" type="submit" value="submit" />
        <input
          className="diary-cancel-button"
          type="button"
          value="cancel"
          onClick={onLocalCancle}
        />
      </div>
    </form>
  );

  return (
    <div className={`${!isClick ? 'diary-add' : 'diary-add-click'}`}>
      {isClick !== true ? (
        <AddCircleOutlineIcon
          fontSize="large"
          onClick={() => setisClick(true)}
        />
      ) : (
        addDiary
      )}
    </div>
  );
}

export default UserDiaryAdd;
