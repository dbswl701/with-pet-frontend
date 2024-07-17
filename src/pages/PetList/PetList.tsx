import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import styled from "styled-components";
import Pet from "./Pet";
import JoinParty from "./JoinParty";
import CreateParty from "./CreateParty";
import "./Pets.css";
import PetAdd from "./PetAdd";
import Party from "./Party";
import dogimgdefault from "../../assets/dogProfileImage.png";
import baseUrl from "../../services/api";
import {
  useGetPetPartiesInfo,
  usePostAddDogIntoParty,
  usePostPetPartyCreate,
  usePutModifyDog,
} from "../../hooks/usePetMutation";
import {
  IAddPetReq,
  IModifyPetReq,
  IPartiesRes,
  IPartyReq,
} from "./types/parties";
import useUserStore from "../../store/user";
import PostFileUpload from "../../services/upload";

const Button = styled.button`
  background-color: #caa969;
  border: none;
  border-radius: 10px;
  width: 256px;
  height: 50px;
  color: white;
`;

function PetList() {
  const [pets, setPets] = useState([]);
  const [partyList, setPartyList] = useState<IPartiesRes[] | []>([]); // 그룹 정보 리스트 전체 저장
  const [openParty, setOpenParty] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  const [partyInfo, setPartyInfo] = useState<IPartyReq>({
    // 파티 생성 정보 저장
    partyDogName: "",
    partyDogBreed: "",
    partyDogBirth: dayjs(today),
    partyDogGender: "",
    partyDogNeutralization: false,
    partyDogWeight: 0,
    partyDogImg: "",
    partyDogIsbn: "",
    partyName: "",
  });
  // 파티에 반려견 추가 시 사용
  const [petInfo, setPetInfo] = useState<IAddPetReq>({
    dogBirth: dayjs(today),
    dogBreed: "",
    dogGender: "",
    dogImg: "",
    dogIsbn: "",
    dogName: "",
    dogNeutralization: false,
    dogWeight: 0,
  });

  // const [userName] = useState(
  //   localStorage.getItem("userInfo")
  //     ? JSON.parse(localStorage.getItem("userInfo")).userName
  //     : "",
  // );

  // 유저 이름 들고오기
  const userName = useUserStore((state2) => state2.user.userName);

  // useEffect(() => {
  //   axios
  //     .get(`${baseUrl}/v2/parties`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setPartyList(res.data.result);
  //     })
  //     .catch(() => {});
  // }, []);
  // 반려견 그룹 정보 불러오기
  const {
    data: partiesData,
    isLoading: partiesIsLoading,
    error: partiesError,
  } = useGetPetPartiesInfo();

  // 파티 생성
  const { mutate: createPartyMutate } = usePostPetPartyCreate();

  useEffect(() => {
    if (partiesData) setPartyList(partiesData);
  }, [partiesData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await PostFileUpload(formData);
    setPartyInfo({
      ...partyInfo,
      partyDogImg: res.data.result[0],
    });
    // axios
    //   .post("https://withpet.site/api/v1/file/upload", formData, config)
    //   .then((res) => {
    //     setPetInfo({
    //       ...petInfo,
    //       partyDogImg: res.data.result[0],
    //     });
    //   });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleImageUpload(e);
    } else {
      const { value, name } = e.target;
      setPartyInfo({
        ...partyInfo,
        [name]: value,
      });
    }
  };

  const onSubmitCreateParty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // axios
    //   .post(`${baseUrl}/v2/parties`, petInfo, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     setPartyList(partyList.concat(res.data.result));
    //   })
    //   .catch(() => {});
    createPartyMutate(partyInfo);
    setPartyInfo({
      partyDogName: "",
      partyDogBreed: "",
      partyDogBirth: dayjs(today),
      partyDogGender: "",
      partyDogNeutralization: false,
      partyDogWeight: 0,
      partyDogImg: "",
      partyDogIsbn: "",
      partyName: "",
    });
    setOpenCreate(false);
  };

  const { mutate: postAddDogMutate } = usePostAddDogIntoParty();
  // 파티에 반려견 추가
  const onSubmit = (e: React.FormEvent<HTMLFormElement>, partyId: number) => {
    e.preventDefault();
    let img = partyInfo.partyDogImg;
    if (img === "") {
      img = dogimgdefault;
    }
    const pet: IAddPetReq = {
      dogName: partyInfo.partyDogName,
      dogBreed: partyInfo.partyDogBreed,
      dogBirth: partyInfo.partyDogBirth,
      dogGender: partyInfo.partyDogGender,
      dogNeutralization: partyInfo.partyDogNeutralization,
      dogWeight: partyInfo.partyDogWeight,
      dogImg: img,
      dogIsbn: partyInfo.partyDogIsbn,
    };
    postAddDogMutate({ partyId, petInfo: pet });
    // axios
    //   .post(`https://withpet.site/api/v1/dogs/register-dog/${partyId}`, pet, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     const updatedResult = partyList.map((item) => {
    //       if (item.partyId === partyId) {
    //         return {
    //           ...item,
    //           partyDogList: item.partyDogList.concat(
    //             res.data.result,
    //           ),
    //         };
    //       }
    //       return item;
    //     });
    //     setPartyList(updatedResult);
    //   })
    //   .catch(() => {});
    setPartyInfo({
      partyDogName: "",
      partyDogBreed: "",
      partyDogBirth: dayjs(today),
      partyDogGender: "",
      partyDogNeutralization: false,
      partyDogWeight: 0,
      partyDogImg: "",
      partyDogIsbn: "",
      partyName: "",
    });
  };

  // put -> mutate
  const { mutate: putModifyDogInfoMutate } = usePutModifyDog();
  const onSubmitModify = (
    partyId: number,
    dogId: number,
    modifyPetInfo: IModifyPetReq,
  ) => {
    // 반려견 정보 수정
    //   axios
    //     .put(`https://withpet.site/api/v1/dogs/${id}`, modifyPetInfo, {
    //       withCredentials: true,
    //     })
    //     .then((res) => {
    //       const updatedResult = partyList.map((item) => {
    //         if (item.partyId === partyId) {
    //           const updatedPets = item.partyDogList.map((pet) => {
    //             if (pet.dog_id === id) {
    //               return res.data.result;
    //             }
    //             return pet;
    //           });

    //           return { ...item, partyDogList: updatedPets };
    //         }
    //         return item;
    //       });
    //       setPartyList(updatedResult);
    //     })
    //     .catch(() => {});

    putModifyDogInfoMutate({ dogId, dogInfo: modifyPetInfo });
  };

  const onCancle = () => {
    setPartyInfo({
      partyDogName: "",
      partyDogBreed: "",
      partyDogBirth: dayjs(today),
      partyDogGender: "",
      partyDogNeutralization: false,
      partyDogWeight: 0,
      partyDogImg: "",
      partyDogIsbn: "",
      partyName: "",
    });
  };

  const handleLeaveParty = (partyId: number) => {
    axios
      .delete(`https://withpet.site/api/v1/groups/${partyId}`, {
        withCredentials: true,
      })
      .then(() => {
        // 자신의 groupList에서 해당 그룹 삭제
        setPartyList((prev) =>
          prev.filter((party) => party.partyId !== partyId),
        );
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          // eslint-disable-next-line no-alert
          alert(err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="list_container">
        {partyList[0] &&
          partyList?.map((party) => (
            <div key={party.partyId}>
              <Party
                party={party}
                isLeader={party.partyLeaderName === userName}
                setPartyList={setPartyList}
                handleLeaveParty={handleLeaveParty}
              />
              {party.partyDogList.map((pet) => {
                return (
                  <Pet
                    isLeader={party.partyLeaderName === userName}
                    partyId={party.partyId}
                    pet={pet}
                    key={pet.dogId}
                    onSubmitModify={onSubmitModify}
                    setPartyList={setPartyList}
                  />
                );
              })}
              <PetAdd
                partyId={party.partyId}
                onSubmit={onSubmit}
                onChange={onChange}
                petInfo={petInfo}
                onCancle={onCancle}
              />
            </div>
          ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "800px",
          }}
        >
          <Button onClick={() => setOpenCreate(true)}>그룹생성</Button>
          <Button onClick={() => setOpenParty(true)}>그룹 가입하기</Button>
        </div>
        <CreateParty
          setPartyInfo={setPartyInfo}
          partyInfo={partyInfo}
          setOpen={setOpenCreate}
          open={openCreate}
          onChange={onChange}
          onSubmit={onSubmitCreateParty}
        />
        <JoinParty
          setPartyList={setPartyList}
          partyList={partyList}
          setOpen={setOpenParty}
          open={openParty}
        />
      </div>
    </>
  );
}

export default PetList;
