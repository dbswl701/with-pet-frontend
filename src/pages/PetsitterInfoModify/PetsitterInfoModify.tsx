import React, { useState, useEffect } from "react";
import PetsitterInfoModifySidebar from "./Components/PetsitterInfoModifySidebar";
import PetsitterInfoModifyHouse from "./Components/PetsitterInfoModifyHouse";
import PetsitterInfoModifyHashTag from "./Components/PetsitterInfoModifyHashTag";
import PetsitterInfoModifyIntro from "./Components/PetsitterInfoModifyIntro";
import PetsitterInfoModifyService from "./Components/PetsitterInfoModifyService";
import PetsitterInfoModifyCritical from "./Components/PetsitterInfoModifyCritical";
import { getPetsitterMyInfo } from "../../services/petsitter";
import {
  IPetSitterHashTags,
  IPetSitterWithPetServices,
} from "./types/petsitter.types";
import { useGetPetsitterInfoQuery } from "../../hooks/usePetsitterInfoMutation";

function PetsitterInfoModify() {
  const [hashTags, setHashTags] = useState<IPetSitterHashTags[]>([]);
  const [introduction, setIntroduction] = useState("");
  const [houseImgList, setHouseImgList] = useState([]);
  const [petSitterLicenseImg, setPetSitterLicenseImg] = useState("");
  const [serviceSelectList, setServiceSelectList] = useState<
    IPetSitterWithPetServices[]
  >([]);
  const [withPetServices, setWithPetServices] = useState([]);
  const [criticalServices, setCriticalServices] = useState([]);
  const [criticalSelectList, setCriticalSelectList] = useState([]);
  const [menu, setMenu] = useState("house");

  // get -> useQuery
  const { data, isLoading, error } = useGetPetsitterInfoQuery();

  if (error) return <div>에러</div>;
  if (isLoading) return <div>로딩중</div>;
  console.log("data 확인:", data);

  console.log("hashTag:", hashTags);
  console.log("houseImgList:", data?.petSitterHouses);

  let print = (
    <PetsitterInfoModifyHouse
      houseImgList={data!.petSitterHouses}
      // setHouseImgList={setHouseImgList}
    />
  );
  if (menu === "hashtag") {
    print = (
      <PetsitterInfoModifyHashTag
        hashTags={data!.petSitterHashTags}
        // setHashTags={setHashTags}
      />
    );
  } else if (menu === "intro") {
    print = (
      <PetsitterInfoModifyIntro
        introduction={data!.petSitterIntroduction}
        // setIntroduction={setIntroduction}
      />
    );
  } else if (menu === "license") {
    print = (
      <>
        <p>자격증</p>
        <img
          src={data!.petSitterLicenseImg}
          alt="자격증 이미지"
          style={{ width: "300px", height: "auto" }}
        />
      </>
    );
  } else if (menu === "service") {
    print = (
      <PetsitterInfoModifyService
        serviceSelectList={data!.petSitterWithPetServices}
        // setServiceSelectList={setServiceSelectList}
        withPetServices={data!.withPetServices}
      />
    );
  } else if (menu === "criticalService") {
    print = (
      <PetsitterInfoModifyCritical
        criticalServices={criticalServices}
        criticalSelectList={criticalSelectList}
        setCriticalSelectList={setCriticalSelectList}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <PetsitterInfoModifySidebar setMenu={setMenu} menu={menu} />
      <div style={{ margin: "auto" }}>{print}</div>
    </div>
  );
}

export default PetsitterInfoModify;
