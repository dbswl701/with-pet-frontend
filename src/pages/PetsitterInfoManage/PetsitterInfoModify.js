import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetsitterInfoModifySidebar from './PetsitterInfoModifySidebar';
import PetsitterInfoModifyHouse from './PetsitterInfoModifyHouse';
import PetsitterInfoModifyHashTag from './PetsitterInfoModifyHashTag';
import PetsitterInfoModifyIntro from './PetsitterInfoModifyIntro';
import PetsitterInfoModifyService from './PetsitterInfoModifyService';
import PetsitterInfoModifyCritical from './PetsitterInfoModifyCritical';

function PetsitterInfoModify() {
  const [hashTags, setHashTags] = useState([]);

  const [introduction, setIntroduction] = useState('');

  const [houseImgList, setHouseImgList] = useState([]);

  const [petSitterLicenseImg, setPetSitterLicenseImg] = useState('');

  const [serviceSelectList, setServiceSelectList] = useState([]);
  const [withPetServices, setWithPetServices] = useState([]);

  const [criticalServices, setCriticalServices] = useState([]);
  const [criticalSelectList, setCriticalSelectList] = useState([]);

  const [menu, setMenu] = useState('house');

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/petsitter/show-myinfo', { withCredentials: true })
      .then((res) => {
        setHouseImgList(res.data.result.petSitterHouses);
        setHashTags(res.data.result.petSitterHashTags);
        setIntroduction(res.data.result.introduction);
        setPetSitterLicenseImg(res.data.result.petSitterLicenseImg);

        setServiceSelectList(res.data.result.petSitterServices);
        setWithPetServices(res.data.result.withPetServices);

        setCriticalServices(res.data.result.criticalServices);
        setCriticalSelectList(res.data.result.petSitterCriticalServices);
      })
      .catch(() => {
      });
  }, []);

  const licenseComponent = (
    <>
      <p>자격증</p>
      <img src={petSitterLicenseImg} alt="자격증 이미지" style={{ width: '300px', height: 'auto' }} />
    </>
  );

  let print = <PetsitterInfoModifyHouse />;
  if (menu === 'house') {
    print = <PetsitterInfoModifyHouse houseImgList={houseImgList} setHouseImgList={setHouseImgList} />;
  } else if (menu === 'hashtag') {
    print = <PetsitterInfoModifyHashTag hashTags={hashTags} setHashTags={setHashTags} />;
  } else if (menu === 'intro') {
    print = <PetsitterInfoModifyIntro introduction={introduction} setIntroduction={setIntroduction} />;
  } else if (menu === 'license') {
    print = licenseComponent;
  } else if (menu === 'service') {
    print = <PetsitterInfoModifyService serviceSelectList={serviceSelectList} setServiceSelectList={setServiceSelectList} withPetServices={withPetServices} />;
  } else if (menu === 'criticalService') {
    print = <PetsitterInfoModifyCritical criticalServices={criticalServices} criticalSelectList={criticalSelectList} setCriticalSelectList={setCriticalSelectList} />;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <PetsitterInfoModifySidebar setMenu={setMenu} />
      <div style={{ margin: 'auto' }}>
        { print }
      </div>
    </div>
  );
}

export default PetsitterInfoModify;
