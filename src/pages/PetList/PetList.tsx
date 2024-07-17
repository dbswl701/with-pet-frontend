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
} from "../../hooks/usePetMutation";
import { IAddPetReq, IPartiesRes, IPartyReq } from "./types/parties";
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
  const [groupList, setGroupList] = useState<IPartiesRes[] | []>([]); // 그룹 정보 리스트 전체 저장
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
  //       setGroupList(res.data.result);
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
    if (partiesData) setGroupList(partiesData);
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
  const onChange = (e) => {
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

  const onSubmitCreateGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // axios
    //   .post(`${baseUrl}/v2/parties`, petInfo, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     setGroupList(groupList.concat(res.data.result));
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
    const pet = {
      partyDogName: partyInfo.partyDogName,
      partyDogBreed: partyInfo.partyDogBreed,
      partyDogBirth: partyInfo.partyDogBirth,
      partyDogGender: partyInfo.partyDogGender,
      partyDogNeutralization: partyInfo.partyDogNeutralization,
      partyDogWeight: partyInfo.partyDogWeight,
      partyDogImg: img,
      partyDogIsbn: partyInfo.partyDogIsbn,
    };
    postAddDogMutate({ partyId, petInfo: pet });
    // axios
    //   .post(`https://withpet.site/api/v1/dogs/register-dog/${partyId}`, pet, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     const updatedResult = groupList.map((item) => {
    //       if (item.partyId === partyId) {
    //         return {
    //           ...item,
    //           dogInfoResponseList: item.dogInfoResponseList.concat(
    //             res.data.result,
    //           ),
    //         };
    //       }
    //       return item;
    //     });
    //     setGroupList(updatedResult);
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

  const onSubmitModify = (partyId, id, modifyPetInfo) => {
    axios
      .put(`https://withpet.site/api/v1/dogs/${id}`, modifyPetInfo, {
        withCredentials: true,
      })
      .then((res) => {
        const updatedResult = groupList.map((item) => {
          if (item.partyId === partyId) {
            const updatedPets = item.dogInfoResponseList.map((pet) => {
              if (pet.dog_id === id) {
                return res.data.result;
              }
              return pet;
            });

            return { ...item, dogInfoResponseList: updatedPets };
          }
          return item;
        });
        setGroupList(updatedResult);
      })
      .catch(() => {});
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
        setGroupList((prev) =>
          prev.filter((group) => group.partyId !== partyId),
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
        {groupList[0] &&
          groupList?.map((group) => (
            <div key={group.partyId}>
              <Party
                group={group}
                isLeader={group.leaderName === userName}
                setGroupList={setGroupList}
                handleLeaveParty={handleLeaveParty}
              />
              {group.dogInfoResponseList.map((pet) => {
                return (
                  <Pet
                    isLeader={group.leaderName === userName}
                    partyId={group.partyId}
                    pet={pet}
                    key={pet.dog_id}
                    onSubmitModify={onSubmitModify}
                    setGroupList={setGroupList}
                  />
                );
              })}
              <PetAdd
                partyId={group.partyId}
                pets={pets}
                setPets={setPets}
                onSubmit={onSubmit}
                onChange={onChange}
                petInfo={partyInfo}
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
          onSubmit={onSubmitCreateGroup}
        />
        <JoinParty
          setGroupList={setGroupList}
          groupList={groupList}
          setOpen={setOpenParty}
          open={openParty}
        />
      </div>
    </>
  );
}

export default PetList;
