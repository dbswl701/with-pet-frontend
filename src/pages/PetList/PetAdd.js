import React, { useState } from 'react';
import './Pets.css';
import dogimgdefault from '../../assets/dogProfileImage.png';

function PetAdd() {
  const [isClick, setisClick] = useState(false);
  const [imgFile, setImgFile] = useState('');
  // const [petInfo, setPetInfo] = useState({
  //   name: '',
  //   breed: '',
  //   birthday: '',
  //   gender: '',
  //   neutralization: '',
  //   weight: '',
  //   isbn: '',
  // })

  const saveImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // const add = (
  //   <p>+</p>
  // );

  const addinfo = (
    <form className="asd">
      <div className="pet-img-regist">
        <img id="preview-image" alt="이미지 미리보기" src={!imgFile ? dogimgdefault : imgFile} />
        <label htmlFor="image-select">프로필 이미지 선택</label>
        <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={saveImg} />
      </div>
      <div className="pet-info-regist">
        <input type="text" name="name" placeholder="반려견 이름을 입력해주세요." required />
        <label htmlFor="breeds">견종</label>
        <input type="select" list="list" id="breeds" />
        <datalist id="list">
          <option value="진돗개" />
          <option value="삽살개" />
          <option value="푸들" />
          <option value="포메라니안" />
        </datalist>
        <label htmlFor="birthday">생일</label>
        <input type="date" name="birthday" id="birthday" required />

        <div className="select">
          <p>성별 선택</p>
          <input type="radio" name="gender" id="male" value="male" />
          <label htmlFor="male">남자</label>
          <input type="radio" name="gender" id="female" value="female" />
          <label htmlFor="female">여자</label>
        </div>

        <div className="select">
          <p>중성화 여부 선택</p>
          <input type="radio" name="neutralization" id="O" value="O" />
          <label htmlFor="O">O</label>
          <input type="radio" name="neutralization" id="X" value="X" />
          <label htmlFor="X">X</label>
        </div>

        <label htmlFor="weight">무게</label>
        <input type="number" name="weight" id="weight" min="0" />

        <label htmlFor="isbn">등록코드</label>
        <input type="text" name="isbn" placeholder="등록코드를 입력하세요(-제외)." required />
      </div>
    </form>
  );

  return (
    <div className={`${!isClick ? 'pet-addinfo' : 'pet-addinfo'}`} onClick={() => { setisClick(!isClick); }}>
      {/* { !isClick ? add : addinfo } */}
      {addinfo}
    </div>
  );
}

export default PetAdd;
