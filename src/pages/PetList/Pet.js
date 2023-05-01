import React from "react";
import './Pets.css'

function Pet({pet, onClick}) {
  const simple =       
  <>
    <img className="pet-img" src={pet.img} />
    <p>{pet.name} / {pet.species} / {pet.birthday}</p>
  </>

  const detail = 
  <>
    <div className="pet-first">
      <div>
        <img className="pet-img" src={pet.img} />
        <div className="pet-group">
          <button>그룹관리</button>
          <p>초대코드 : ABCD</p>
          <p>맴버1</p>
          <p>맴버2</p>
          <button>그룹 나가기</button>
        </div>
      </div>
      <div className="pet-info">
        <p>이름 {pet.name}</p>
        <p>견종 {pet.species}</p>
        <p>생일 {pet.birthday}</p>
      </div>
    </div>
    <div className="pet-second">
      <button>사회화</button>
      <button>건강수첩</button>
    </div>
  </>
  return (
    <div className={`${!pet.isClick ? "pet-block" : "pet-detail"}`} onClick={()=>onClick(pet.id)}>
      {!pet.isClick ? simple : detail}
    </div>
  )
}

export default Pet;
