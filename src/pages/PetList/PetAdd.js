import React, { useState } from 'react';
import './Pets.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import dogimgdefault from '../../assets/dogProfileImage.png';

function PetAdd({ onSubmit, onChange, petInfo }) {
  const [isClick, setisClick] = useState(false);

  // const add = (
  //   <AddCircleOutlineIcon fontSize="large" onClick={() => { setisClick(true); }} />
  // );

  const addinfo = (
    <form onSubmit={onSubmit}>
      <div className="pet-img-regist">
        <img id="preview-image" alt="이미지 미리보기" src={!petInfo.img ? dogimgdefault : petInfo.img} />
        <label htmlFor="image-select">프로필 이미지 선택</label>
        <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} />
      </div>
      <div className="pet-info-regist">
        <input type="text" name="name" placeholder="반려견 이름을 입력해주세요." onChange={onChange} value={petInfo.name} required />

        <label htmlFor="breeds">견종</label>
        <input type="select" list="list" id="breeds" name="breed" onChange={onChange} value={petInfo.breed} />
        <datalist id="list">
          <option value="진돗개" />
          <option value="삽살개" />
          <option value="푸들" />
          <option value="포메라니안" />
        </datalist>

        <label htmlFor="birthday">생일</label>
        <input type="date" name="birthday" id="birthday" onChange={onChange} value={petInfo.birthday} required />

        <div className="select">
          <p>성별 선택</p>
          <input type="radio" name="gender" id="male" value="male" onChange={onChange} checked={petInfo.gender === 'male'} />
          <label htmlFor="male">남자</label>
          <input type="radio" name="gender" id="female" value="female" onChange={onChange} checked={petInfo.gender === 'female'} />
          <label htmlFor="female">여자</label>
        </div>

        <div className="select">
          <p>중성화 여부 선택</p>
          <input type="radio" name="neutralization" id="O" value="true" onChange={onChange} checked={petInfo.neutralization === 'true'} />
          <label htmlFor="O">O</label>
          <input type="radio" name="neutralization" id="X" value="false" onChange={onChange} checked={petInfo.neutralization === 'false'} />
          <label htmlFor="X">X</label>
        </div>

        <label htmlFor="weight">무게</label>
        <input type="number" name="weight" id="weight" min="0" value={petInfo.weight} onChange={onChange} />

        <label htmlFor="isbn">등록코드</label>
        <input type="text" name="isbn" placeholder="등록코드를 입력하세요(-제외)." required value={petInfo.isbn} onChange={onChange} />
        <input type="submit" value="submit" />
        <input type="button" value="cancel" onClick={() => { setisClick(false); }} />
      </div>
    </form>
  );

  return (
    <div className={`${!isClick ? 'pet-add' : 'pet-addinfo'}`}>
      {
        isClick !== true ? <AddCircleOutlineIcon fontSize="large" onClick={() => { setisClick(true); }} /> : addinfo
      }
    </div>
  );
}

export default PetAdd;
