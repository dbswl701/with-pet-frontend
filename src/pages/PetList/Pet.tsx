import React, { useState } from "react";
import axios from "axios";
import "./Pets.css";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import PetModify from "./PetModify";
import PetDetail from "./PetDetail";
import { IModifyPetReq, IPartiesRes, IPartyDogList } from "./types/parties";
import { useDeleteDogMutation } from "../../hooks/usePetMutation";

interface IProps {
  pet: IPartyDogList;
  onSubmitModify: (
    partyId: number,
    dogId: number,
    modifyPetInfo: IModifyPetReq
  ) => void;
  partyId: number;
  setPartyList: React.Dispatch<React.SetStateAction<[] | IPartiesRes[]>>;
  isLeader: boolean;
}

function Pet({ pet, onSubmitModify, partyId, setPartyList, isLeader }: IProps) {
  const [removeDog, setRemoveDog] = useState(false);
  const [toggle, setToggle] = useState<string>("simple");
  const simple = (
    <div style={{ alignItems: "center", display: "flex" }}>
      <img className="pet-img" src={pet.dogImg} alt="반려견 프로필 사진" />
      <p>
        {pet.dogName} / {pet.dogBreed} / {pet.dogBirth}
      </p>
      <ChevronLeftOutlinedIcon
        className="down-icon"
        fontSize="large"
        onClick={() => setToggle("detail")}
      />
    </div>
  );

  const onToggle = (state: string) => {
    setToggle(state);
  };

  const { mutate: deleteDogMutate } = useDeleteDogMutation();
  const handleRemoveDog = (dogId: number, partyId: number) => {
    deleteDogMutate({ dogId, partyId });
    // axios
    //   .delete(`https://withpet.site/api/v1/dogs/${dogId}`, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     setRemoveDog(true);

    //     // 만약 그룹의 마지막 개라면, 그룹 삭제
    //     if (res.data.result) {
    //       setPartyList((prev) =>
    //         prev.filter((party) => party.partyId !== partyId),
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.status === 400) {
    //       // eslint-disable-next-line no-alert
    //       alert(err.response.data.message);
    //     }
    //   });
  };

  let print = simple;

  switch (toggle) {
    case "detail":
      print = (
        <PetDetail
          pet={pet}
          onToggle={onToggle}
          handleRemoveDog={handleRemoveDog}
          isLeader={isLeader}
          partyId={partyId}
        />
      );
      break;
    case "modify":
      print = (
        <PetModify
          petInfo={pet}
          onSubmit={onSubmitModify}
          onToggle={onToggle}
          partyId={partyId}
        />
      );
      break;
    case "simple":
      print = simple;
      break;
    default:
      print = simple;
      break;
  }
  return (
    <div
      className={`${toggle === "simple" ? "pet-block" : "pet-detail"}`}
      style={{ display: removeDog ? "none" : "flex" }}
    >
      {print}
    </div>
  );
}

export default Pet;
