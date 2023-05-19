import React, { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import dayjs from 'dayjs';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dogimgdefault from '../../assets/dogProfileImage.png';
// UserDiaryList에 추가해야됨.
function UserDiaryAdd({
  onSubmit,
  onChange,
  diaryInfo,
  onCancel,
}) {
  const [isClick, setisClick] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [categoryId, setCategoryId] = useState('');
  const [dogs, setDogs] = useState([]);
  // const [dogId, setDogId] = useState('');
  const styles = {
    formControl: {
      margin: '8px',
      minWidth: '120px',
    },
    select: {
      padding: '8px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
      outline: 'none',
    },
  };

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

  // const handleCategoryChange = (event) => {
  //   setCategoryId(event.target.value);
  //   // setCategoryName(event.target.name);
  // };

  // const handleDogChange = (event) => {
  //   setDogId(event.target.value);
  // };

  // useEffect(() => {
  //   // 카테고리 selectbox 불러오기
  //   axios
  //     .get('https://withpet.site/api/v1/category', {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setCategories(res.data.result);
  //       console.log(res.data.result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    // 반려견 selectbox 불러오기
    axios
      .get('https://withpet.site/api/v1/calendar', {
        withCredentials: true,
      })
      .then((res) => {
        setDogs(res.data.result.dogSimpleInfoResponses);
        setCategories(res.data.result.categoryResponses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const onChange = (e) => {
  //   const { name, value } = e.target;
  //   setDiaryInfo({
  //     ...diaryInfo,
  //     [name]: value,
  //   });
  // }; feat.윤지

  const addDiary = (
    <form onSubmit={onLocalSubmit}>
      <div className="select-diary-type">
        {/* <div>{console.log('asdasdf', categoryId)}</div> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ m: 1 }}
            label="날짜"
            // value={diaryInfo.createdAt}
            // value={new Date()}
            onChange={onChangeCalendar}
            name="createdAt"
            format="YYYY/MM/DD"
          />
        </LocalizationProvider>
      </div>
      <div>
        {/* 카테고리, 반려견 불러오기 */}
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          {/* <InputLabel id="demo-simple-select-label">카테고리</InputLabel> */}
          <select
            name="categoryId"
            id="categoryId"
            value={diaryInfo.categoryId}
            label="카테고리"
            style={styles.select}
            onChange={onChange}
          >
            {categories.map((item) => (
              <option
                key={item.categoryId}
                value={item.categoryId}
                name="categoryId"
              >
                {item.name}
              </option>
            ))}
          </select>
        </FormControl>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          {/* <InputLabel id="demo-simple-select-label">반려견</InputLabel> */}
          <select
            name="dogId"
            id="dogId"
            value={diaryInfo.dogId}
            label="반려견"
            style={styles.select}
            onChange={onChange}
          >
            {dogs.map((item) => (
              <option key={item.dogId} value={item.dogId} name="dogId">
                {item.name}
              </option>
            ))}
            {/* {categories.map((category) => {
              <MenuItem key={category.categoryId} value={category.categoryId}>
                {category.name}
              </MenuItem>;
            })} */}
          </select>
        </FormControl>
      </div>

      <div className="today-img-regist">
        <img
          id="preview-image"
          alt="이미지 미리보기"
          src={!diaryInfo.media ? dogimgdefault : diaryInfo.media}
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
          // value={diaryInfo.title}
        />
        <TextField
          sx={{ m: 1 }}
          label="내용"
          variant="outlined"
          size="small"
          name="contentBody"
          onChange={onChange}
          // value={diaryInfo.contentBody}
        />
        <input className="diary-add-btn" type="submit" value="submit" />
        <input
          className="diary-add-btn diary-add-cancel-btn"
          type="button"
          value="cancel"
          onClick={onLocalCancle}
        />
      </div>
    </form>
  );

  return (
    <div className={`${!isClick ? 'diary-add' : 'diary-detail'}`}>
      {isClick !== true ? (
        <AddCircleOutlineIcon
          fontSize="large"
          onClick={() => {
            setisClick(true);
          }}
        />
      ) : (
        addDiary
      )}
    </div>
  );
}

export default UserDiaryAdd;
