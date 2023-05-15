import React, { useState, useRef, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Service from './Service';
// import Img1 from '../../assets/smart-car.png';
// import Img2 from '../../assets/Group.png';
// import Img3 from '../../assets/Group 12.png';
// import Img4 from '../../assets/Frame 202.png';
// import Img5 from '../../assets/Group 11.png';
import dogimgdefault from '../../assets/dogProfileImage.png';

// Generate Order Data
// function createData(id, name, img, intro) {
//   return {
//     id, name, img, intro,
//   };
// }

// const rows = [
//   createData(
//     0,
//     '집앞 픽업',
//     Img1,
//     '010-1111-2222',
//     'WAIT',
//   ),
//   createData(
//     1,
//     '모발 관리',
//     Img2,
//     '010-1111-2222',
//     'WAIT',
//   ),
//   createData(
//     2,
//     '약물 복용',
//     Img3,
//     '010-1111-2222',
//     'WAIT',
//   ),
//   createData(
//     3,
//     '응급처치',
//     Img4,
//     '010-1111-2222',
//     'WAIT',
//   ),
//   createData(
//     4,
//     '목욕 가능',
//     Img5,
//     '010-1111-2222',
//     'WAIT',
//   ),
// ];

export default function Orders() {
  const nextId = useRef(5);
  const [list, setList] = useState([]);
  const [data, setData] = useState({
    // id: '',
    serviceName: '',
    serviceImg: '',
    serviceIntroduction: '',
  });

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/show-services', { withCredentials: true })
      .then((res) => {
        setList(res.data.result);
        console.log(res.data.result);
      });
  }, []);

  const onChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setData({
          ...data,
          serviceImg: reader.result,
        });
      };
    } else {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const onSubmit = (e) => { // 하나 등록 시
    e.preventDefault();
    // setList(list.concat({ ...data, id: nextId.current }));
    nextId.current += 1;
    // console.log({ ...data, id: nextId.current });
    // data.serviceImg = '123';
    console.log(data);
    axios.post('https://withpet.site/api/v1/admin/add-service', data, { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        setList(list.concat(res.data.result));
      })
      .catch(() => {
      });
    setData({
      serviceName: '',
      serviceImg: '',
      serviceIntroduction: '',
    });
  };

  const onSubmitModify = (modifyPetInfo) => {
    // setList(list.map((pet) => (pet.id === id ? modifyPetInfo : pet)));
    console.log(modifyPetInfo);
    axios.put('https://withpet.site/api/v1/admin/service', modifyPetInfo, { withCredentials: true })
      .then((res) => {
        const updatedList = list.map((item) => {
          if (item.serviceId === modifyPetInfo.serviceId) {
            return res.data.result;
          }
          return item;
        });
        setList(updatedList);
      })
      .catch(() => {
      });
  };

  const onDelete = (item) => {
    console.log(item);
    setList(list.filter((item2) => (item2.serviceId !== item.serviceId)));

    axios.post('https://withpet.site/api/v1/admin/service', item, { withCredentials: true })
      .then(() => {
        console.log(item);
        setList(list.filter((item2) => (item2.serviceId !== item.serviceId)));
      });
  };
  console.log(list);
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>서비스 리스트</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>아이콘</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>설명</TableCell>
            <TableCell>승낙 여부</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <Service key={row.serviceId} item={row} onModify={onSubmitModify} onDelete={onDelete} />
          ))}
          <TableRow style={{ height: '50px' }}>
            <TableCell>5</TableCell>
            <TableCell>
              <img id="preview-image" alt="이미지 미리보기" src={!data.serviceImg ? dogimgdefault : data.serviceImg} />
              <label htmlFor="image-select">프로필 이미지 선택</label>
              <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} />
            </TableCell>
            <TableCell>
              <TextField sx={{ m: 1 }} label="이름" variant="outlined" name="serviceName" onChange={onChange} value={data.serviceName} required />
            </TableCell>
            <TableCell>
              <TextField sx={{ m: 1 }} label="설명" variant="outlined" name="serviceIntroduction" onChange={onChange} value={data.serviceIntroduction} required />
            </TableCell>
            <TableCell>
              <button onClick={onSubmit}>추가</button>
              <button>취소</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
