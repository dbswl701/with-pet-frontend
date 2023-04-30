import React, {useState} from "react";
import Pet from './Pet';
import './Pets.css';

function PetList() {
  const [pets, setPets] = useState([
    {
      id: 0,
      name: "멍멍이",
      species: "진돗개",
      birthday: "2023.04.30",
      img: "https://img.freepik.com/premium-photo/little-fluffy-puppy-of-pomeranian-spitz-lying-on-bright-yellow-background_253512-22.jpg",
    },
    {
      id: 1,
      name: "강아지",
      species: "진돗개",
      birthday: "2023.04.30",
      img: "https://image.dongascience.com/Photo/2022/06/6982fdc1054c503af88bdefeeb7c8fa8.jpg",
    },
    {
      id: 2,
      name: "복실이",
      species: "진돗개",
      birthday: "2023.04.30",
      img: "https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525081724428qquq.jpg",
    },
  ]);

  return (
    <>
      <div className="list_container">
        {pets.map(pet => (
          <Pet pet={pet} key={pet.id} />
        ))}
      </div>
    </>
  )
}

export default PetList;