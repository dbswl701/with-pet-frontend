import React from "react";
import './Pets.css'
function Pet({pet, onClick}) {
  return (
    <div className="pet-block" onClick={onClick}>
      <img className="pet-img" src={pet.img} />
      <p>{pet.name} / {pet.species} / {pet.birthday}</p>
    </div>
  )
}

export default Pet;
