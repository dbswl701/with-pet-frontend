import React, { useState } from 'react';
import './Pets.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dogimgdefault from '../../assets/dogProfileImage.png';

function PetAdd({
  onSubmit, onChange, petInfo, onCancle, setPets, pets,
}) {
  const [isClick, setisClick] = useState(false);
  const [partyCode, setPartyCode] = useState('');
  const onLocalSubmit = (e) => {
    onSubmit(e);
    setisClick(false);
  };

  const onChangeCalendar = (date) => {
    console.log(date);
    console.log(dayjs(date).format('YYYY-MM-DD'));
    const e = {
      target: {
        name: 'dog_birth',
        value: dayjs(date).format('YYYY-MM-DD'),
      },
    };
    onChange(e);
  };

  const onLocalCancle = () => {
    onCancle();
    setisClick(false);
  };

  const onJoinParty = () => {
    axios.post('https://withpet.site/api/v1/groups/member', { partyIsbn: partyCode }, { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        setPets(pets.concat(res.data.result));
        // setPets(res.data.result);
        setisClick(false);
        setPartyCode('');
      })
      .catch((res) => {
        const temp = res.request.response;
        // const temp = { errorCode: 'DUPLICATED_GROUP_MEMBER', message: '해당 그룹에 존재하는 유저입니다.' };

        console.log(temp);
        // eslint-disable-next-line dot-notation
        console.log(temp['message']);
      });
  };

  const addinfo = (
    <form onSubmit={onLocalSubmit}>
      <div className="pet-img-regist">
        <img
          id="preview-image"
          alt="이미지 미리보기"
          src={!petInfo.dog_img ? dogimgdefault : petInfo.dog_img}
        />
        <label htmlFor="image-select">프로필 이미지 선택</label>
        <input
          type="file"
          accept="image/*"
          id="image-select"
          style={{ display: 'none' }}
          onChange={onChange}
        />

        <div style={{ backgroundColor: 'white', marginTop: '30px' }}>
          <p>그룹에 참여하기</p>
          <TextField sx={{ m: 1 }} label="코드 입력" variant="standard" size="small" name="inviteCode" value={partyCode} onChange={(e) => setPartyCode(e.target.value)} />
          <input type="button" value="그룹 참여" onClick={onJoinParty} />
        </div>
      </div>
      <div className="pet-info-regist">
        <TextField
          sx={{ m: 1 }}
          label="이름"
          variant="outlined"
          size="small"
          name="dog_name"
          onChange={onChange}
          value={petInfo.dog_name}
          required
        />

        <TextField
          sx={{ m: 1 }}
          select
          label="견종"
          variant="outlined"
          name="dog_breed"
          onChange={onChange}
          value={petInfo.dog_breed}
          size="small"
          required
        >
          <MenuItem value="진돗개">진돗개</MenuItem>
          <MenuItem value="삽살개">삽살개</MenuItem>
          <MenuItem value="리트리버">리트리버</MenuItem>
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ m: 1 }}
            label="생일"
            value={petInfo.dog_birth}
            onChange={onChangeCalendar}
            name="dog_birth"
            format="YYYY/MM/DD"
          />
        </LocalizationProvider>

        <div className="select">
          <p>성별 선택</p>
          <input
            type="radio"
            name="dog_gender"
            id="male"
            value="male"
            onChange={onChange}
            checked={petInfo.dog_gender === 'male'}
            required
          />
          <label htmlFor="male">수컷</label>
          <input
            type="radio"
            name="dog_gender"
            id="female"
            value="female"
            onChange={onChange}
            checked={petInfo.dog_gender === 'female'}
          />
          <label htmlFor="female">암컷</label>
        </div>

        <div className="select">
          <p>중성화 여부 선택</p>
          <input
            type="radio"
            name="neutralization"
            id="O"
            value="true"
            onChange={onChange}
            checked={petInfo.neutralization === 'true'}
          />
          <label htmlFor="O">O</label>
          <input
            type="radio"
            name="neutralization"
            id="X"
            value="false"
            onChange={onChange}
            checked={petInfo.neutralization === 'false'}
          />
          <label htmlFor="X">X</label>
        </div>

        <TextField
          sx={{ m: 1 }}
          label="무게"
          type="number"
          variant="outlined"
          size="small"
          name="dog_weight"
          onChange={onChange}
          value={petInfo.dog_weight}
          required
        />

        <TextField
          sx={{ m: 1 }}
          label="등록코드"
          type="number"
          variant="outlined"
          size="small"
          name="dog_isbn"
          onChange={onChange}
          value={petInfo.dog_isbn}
          required
        />

        <input className="pet-add-btn" type="submit" value="submit" />
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

export default PetAdd;
