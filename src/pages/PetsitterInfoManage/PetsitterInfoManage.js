import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';

// function Item({ service }) {
//   return (
//     <>
//       <div style={{ backgroundColor: 'gray' }}>
//         {/* 사진, 이름, 내용 */}
//         <img src={service.serviceImg} alt="서비스 이미지" />
//         <p>{service.serviceName}</p>
//         <p>{service.serviceIntroduction}</p>
//       </div>
//     </>
//   );
// }

function PetsitterInfoManage() {
  const [info, setInfo] = useState({});
  const [toggle, onToggle] = useState(false);
  // const navigate = useNavigate();

  // 해시태그(petSitterHashTags)
  const [hashTags, setHashTags] = useState([]);
  const [hashTag, setHashTag] = useState('');

  // 소개글(introduction)
  const [introduction, setIntroduction] = useState('');

  // // 필수 서비스(petSitterCriticalServiceRequests)
  // const [criticalService, setCriticalService] = useState([]);

  // // 펫시터 집사진(petSitterHouseRequests)
  const [houseImgList, setHouseImgList] = useState([]);

  // // 펫시텃 서비스
  // const [serviceSelectList, setServiceSelectList] = useState([]);

  // 관리자 서비스
  // const [withPetServices, setWithPetServices] = useState([]);
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/petsitter/show-myinfo', { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        setInfo(res.data.result);
        console.log(res.data.result);
        console.log(res.data.result.introduction === null);
        if (res.data.result.introduction === null) {
          setInfo({
            criticalServices: [
              {
                serviceId: 0,
                serviceImg: '',
                serviceIntroduction: '',
                serviceName: '',
              },
            ],
            introduction: '',
            petSitterCriticalServices: [
              {
                petSitterServiceId: 0,
                price: 0,
                serviceId: 0,
                serviceImg: '',
                serviceIntro: '',
                serviceName: '',
              },
            ],
            petSitterHashTags: [
              {
                hashTagName: '',
                petSitterHashTagId: 0,
              },
            ],
            petSitterHouses: [
              {
                houseId: 0,
                houseImg: '',
                representative: true,
              },
            ],
            petSitterLicenseImg: res.data.result.petSitterLicenseImg,
            petSitterServices: [
              {
                petSitterServiceId: 0,
                price: 0,
                serviceId: 0,
                serviceImg: '',
                serviceIntro: '',
                serviceName: '',
              },
            ],
            withPetServices: res.data.result.withPetServices,
          });
        } else {
          setInfo(res.data.result);
        }
        setIntroduction(res.data.result.introduction);
        setHashTags(res.data.result.petSitterHashTags);
        setHouseImgList(res.data.result.petSitterHouses);
        // setWithPetServices(res.data.result.withPetServices);
      })
      .catch(() => {
      });
  }, []);
  // const nextId = useRef(1);
  console.log(info);
  console.log(info.withPetServices);

  // const onModify = () => {
  //   navigate('./modify');
  // };

  // const onChange = (e) => {
  //   const { name, value } = e.target;
  //   setInfo({
  //     ...info,
  //     [name]: value,
  //   });
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    const houseList = houseImgList.map((houseImg, index) => {
      const representative = index === 0;
      return { houseImg, representative };
    });

    console.log(houseList);
    console.log(hashTags);
    const updatedInfo = {
      introduction,
      petSitterCriticalServiceRequests: [
        {
          price: 0,
          serviceId: 1,
        },
      ],
      petSitterHashTagRequests: hashTags,
      petSitterHouseRequests: houseList,
      petSitterServiceRequests: [
        {
          price: 0,
          serviceIds: 1,
        },
      ],
    };
    console.log(updatedInfo);
    axios.put('https://withpet.site/api/v1/petsitter/update-myinfo', updatedInfo, { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
      })
      .catch(() => {});
  };

  const handleHashtag = () => {
    if (hashTags.includes(hashTag)) {
      console.log('중복된 값입니다.');
    } else {
      setHashTags([...hashTags, { hashTagId: 0, hashTagName: hashTag }]);
    }
    // nextId.current += 1;
    console.log(hashTag);
  };
  console.log(hashTags);
  console.log(introduction);
  const onRemoveHashtag = (id) => {
    // 해시태그 하나 삭제
    setHashTags(hashTags.filter((tag) => (tag.petSitterHashTagId !== id)));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const imagePreview = ev.target.result;
        setHouseImgList((prevImages) => [...prevImages, imagePreview]);
      };
      reader.readAsDataURL(file);
    });
  };
  console.log(houseImgList);

  const modify = (
    <>
      <p>펫시터 정보 수정 페이지</p>
      <form onSubmit={onSubmit}>
        <p>집사진</p>
        <div>
          {houseImgList.map((image, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <img src={image} alt={`Preview ${index}`} style={{ width: '200px', height: '200px', margin: '5px' }} />
              <input type="button" value="x" />
              { index === 0 ? <p>대표사진</p> : <p> </p>}
            </div>
          ))}
        </div>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />

        <p>해시태그</p>
        {hashTags && hashTags.map((tag) => (
          <div key={tag.hashTagName}>
            <p>{tag.hashTagName}</p>
            <input type="button" value="x" onClick={() => onRemoveHashtag(tag.petSitterHashTagId)} />
          </div>
        ))}

        <TextField sx={{ m: 1 }} label="이름" variant="outlined" size="small" name="hashTagName" onChange={(e) => setHashTag(e.target.value)} value={hashTag} />
        <input type="button" onClick={handleHashtag} value="추가" />

        <p>소개글</p>
        <TextField sx={{ m: 1 }} label="소개글" variant="outlined" size="small" name="introduction" onChange={(e) => setIntroduction(e.target.value)} value={introduction} required />

        <p>자격증</p>
        <img id="preview-image" alt="이미지 미리보기" src={info.petSitterLicenseImg} />

        <p>이용 가능 서비스</p>
        <input className="pet-add-btn" type="submit" value="수정" />
        <input className="pet-add-btn pet-add-cancel-btn" type="button" value="취소" onClick={() => onToggle(!toggle)} />
      </form>
    </>
  );

  // const isServiceIdIncluded = info.withPetServices.map((service) => {
  //   return {
  //     ...service,
  //     isIncluded: info.petSitterServices.some(
  //       (sitterService) => sitterService.serviceId === service.serviceId,
  //     ),
  //   };
  // });

  // console.log(isServiceIdIncluded);
  return (
    <>
      { modify }
    </>
  );
}

export default PetsitterInfoManage;
