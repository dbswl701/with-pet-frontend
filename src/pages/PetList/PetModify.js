import React, { useState } from 'react';
import dogimgdefault from '../../assets/dogProfileImage.png';

function PetModify({ onSubmit, petInfo, onToggle }) {
  const [modifyPetInfo, setModifyPetInfo] = useState({
    dog_name: petInfo.dog_name,
    dog_breed: petInfo.dog_breed,
    dog_birth: petInfo.dog_birth,
    dog_gender: petInfo.dog_gender,
    neutralization: petInfo.neutralization,
    dog_weight: petInfo.dog_weight,
    dog_img: petInfo.dog_img,
    dog_isbn: petInfo.dog_isbn,
  });
  const onChange = (e) => {
    const { value, name } = e.target;
    setModifyPetInfo({
      ...modifyPetInfo,
      [name]: value,
    });
  };

  const onLocalSubmit = (e) => {
    e.preventDefault();
    onToggle('detail');
    onSubmit(petInfo.dog_id, modifyPetInfo);
  };

  const modify = (
    <form onSubmit={onLocalSubmit}>
      <div className="pet-img-regist">
        <img id="preview-image" alt="이미지 미리보기" src={!modifyPetInfo.dog_img ? dogimgdefault : modifyPetInfo.dog_img} />
        <label htmlFor="image-select">프로필 이미지 선택</label>
        <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} />
      </div>
      <div className="pet-info-regist">
        <input type="text" name="dog_name" placeholder="반려견 이름을 입력해주세요." onChange={onChange} value={modifyPetInfo.dog_name} required />

        <label htmlFor="breeds">견종</label>
        <input type="select" list="list" id="breeds" name="dog_breed" onChange={onChange} value={modifyPetInfo.dog_breed} />
        <datalist id="list">
          <option value="진돗개" />
          <option value="삽살개" />
          <option value="푸들" />
          <option value="포메라니안" />
        </datalist>

        <label htmlFor="birthday">생일</label>
        <input type="date" name="dog_birthday" id="birthday" onChange={onChange} value={modifyPetInfo.dog_birth} required />

        <div className="select">
          <p>성별 선택</p>
          <input type="radio" name="dog_gender" id="male" value="male" onChange={onChange} checked={modifyPetInfo.dog_gender === 'male'} />
          <label htmlFor="male">남자</label>
          <input type="radio" name="dog_gender" id="female" value="female" onChange={onChange} checked={modifyPetInfo.dog_gender === 'female'} />
          <label htmlFor="female">여자</label>
        </div>

        <div className="select">
          <p>중성화 여부 선택</p>
          <input type="radio" name="neutralization" id="O" value="true" onChange={onChange} checked={modifyPetInfo.neutralization === true} />
          <label htmlFor="O">O</label>
          <input type="radio" name="neutralization" id="X" value="false" onChange={onChange} checked={modifyPetInfo.neutralization === false} />
          <label htmlFor="X">X</label>
        </div>

        <label htmlFor="weight">무게</label>
        <input type="number" name="dog_weight" id="weight" min="0" value={modifyPetInfo.dog_weight} onChange={onChange} />

        <label htmlFor="isbn">등록코드</label>
        <input type="text" name="dog_isbn" placeholder="등록코드를 입력하세요(-제외)." required value={modifyPetInfo.dog_isbn} onChange={onChange} />
        <input type="submit" value="submit" />
        <input type="button" value="cancel" onClick={() => onToggle('detail')} />
      </div>
    </form>
  );
  return (
    <>
      {modify}
    </>
  );
}

export default PetModify;
