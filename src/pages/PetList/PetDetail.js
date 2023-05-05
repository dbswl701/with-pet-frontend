import React from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

function PetDetail({ pet, onClick, onModify }) {
  // const [isModify, setIsModify] = useState(false);

  const detail = (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="pet-first">
          <div className="pet-img-group">
            <img className="pet-img" src={pet.img} alt="반려견 프로필 사진" />
            <div className="pet-group">
              <button>그룹관리</button>
              <p>초대코드 : ABCD</p>
              <p>맴버1</p>
              <p>맴버2</p>
              <button>그룹 나가기</button>
            </div>
          </div>
          <div className="pet-info">
            <h1>이름 {pet.name}</h1>
            <p>견종 {pet.breed}</p>
            <p>생일 {pet.birthday}</p>
            <p>성별 {pet.gender}</p>
            <p>중성화 여부 {pet.neutralization}</p>
            <p>무게 {pet.weight}</p>
            <p>등록코드 {pet.isbn}</p>
          </div>
        </div>
        <div className="pet-second">
          <button>사회화</button>
          <button>건강수첩</button>
        </div>
        <div>
          <button onClick={onModify}>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <div>
        <ExpandCircleDownIcon className="up-icon" fontSize="large" onClick={onClick} />
      </div>
    </>
  );

  return (
    <>
      { detail }
    </>
  );
}

export default PetDetail;
