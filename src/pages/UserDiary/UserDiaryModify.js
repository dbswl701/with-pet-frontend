import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function UserDiaryModify({ onSubmit, diaryInfo, onToggle }) {
  const [modifyDiaryInfo, setModifyDiaryInfo] = useState({
    createdAt: diaryInfo.createdAt,
    categoryName: diaryInfo.categoryName,
    title: diaryInfo.title,
    content: diaryInfo.content,
    diaryId: diaryInfo.userdiaryId,
  });
  const [submitInfo, setSubmitInfo] = useState({});
  const onChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setModifyDiaryInfo({
          ...modifyDiaryInfo,
          todayImg: reader.result,
        });
      };
    } else {
      const { value, name } = e.target;
      setModifyDiaryInfo({
        ...modifyDiaryInfo,
        [name]: value,
      });
    }
  };
  const onLocalSubmit = (e) => {
    e.preventDefault();
    onToggle('detail');
    setModifyDiaryInfo({
      ...modifyDiaryInfo,
    });
    setSubmitInfo({
      // 테스트용
      //   categoryId: modifyDiaryInfo.categoryName,
      contentBody: modifyDiaryInfo.content,
      createdAt: modifyDiaryInfo.createdAt,
      dogId: modifyDiaryInfo.dogId,
      title: modifyDiaryInfo.title,
    });
    onSubmit(diaryInfo.id, submitInfo);
  };
  const onChangeCalendar = (date) => {
    const e = {
      target: {
        name: 'createdAt',
        value: dayjs(date).format('YYYY-MM-DD'),
      },
    };
    onChange(e);
  };
  const modify = (
    <form onSubmit={onLocalSubmit}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ m: 1 }}
          label="날짜"
          value={dayjs(modifyDiaryInfo.createdAt)}
          onChange={onChangeCalendar}
          name="createdAt"
          format="YYYY/MM/DD"
          required
        />
      </LocalizationProvider>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="categoryId"
          //   value={categoryId}
          label="카테고리"
        >
          {/* {categoryId.map((categoryName) => (
              <MenuItem key={categoryId} value={categoryName}></MenuItem>
            ))} */}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">반려견</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="dogId"
          //   value={dogId}
          label="반려견"
        >
          {/* {categoryId.map((categoryName) => (
              <MenuItem key={categoryId} value={categoryName}></MenuItem>
            ))} */}
        </Select>
      </FormControl>
      <div className="select-diary-type">
        <img id="preview-img" src={modifyDiaryInfo.todayImg} alt="preview" />
        <label htmlFor="image-select">오늘의 사진 선택</label>
        <input
          type="file"
          accept="image/*"
          id="image-select"
          style={{ display: 'none' }}
          onChange={onChange}
        />
      </div>
      <div className="diary-contents-regist">
        {/* 카테고리 바꾸기 */}
        <TextField
          sx={{ m: 1 }}
          label="제목"
          variant="outlined"
          size="small"
          name="title"
          onChange={onChange}
          value={modifyDiaryInfo.title}
        />
        <TextField
          sx={{ m: 1 }}
          label="내용"
          variant="outlined"
          size="medium"
          name="content"
          onChange={onChange}
          value={modifyDiaryInfo.content}
        />
        <input
          className="diary-contents-regist-btn"
          type="submit"
          value="수정"
        />
        <input
          className="diary-contents-regist-btn-cancel"
          type="button"
          value="취소"
          onClick={() => onToggle('detail')}
        />
      </div>
    </form>
  );
  return <>{modify}</>;
}
export default UserDiaryModify;
