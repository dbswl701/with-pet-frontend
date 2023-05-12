import React, { useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Service from './Service';
import Img1 from '../../assets/smart-car.png';
import Img2 from '../../assets/Group.png';
import Img3 from '../../assets/Group 12.png';
import Img4 from '../../assets/Frame 202.png';
import Img5 from '../../assets/Group 11.png';
import dogimgdefault from '../../assets/dogProfileImage.png';

// Generate Order Data
function createData(id, name, img, intro) {
  return {
    id, name, img, intro,
  };
}

const rows = [
  createData(
    0,
    '집앞 픽업',
    Img1,
    '010-1111-2222',
    'WAIT',
  ),
  createData(
    1,
    '모발 관리',
    Img2,
    '010-1111-2222',
    'WAIT',
  ),
  createData(
    2,
    '약물 복용',
    Img3,
    '010-1111-2222',
    'WAIT',
  ),
  createData(
    3,
    '응급처치',
    Img4,
    '010-1111-2222',
    'WAIT',
  ),
  createData(
    4,
    '목욕 가능',
    Img5,
    '010-1111-2222',
    'WAIT',
  ),
];

export default function Orders() {
  const nextId = useRef(5);
  const [list, setList] = useState(rows);
  const [data, setData] = useState({
    id: '',
    name: '',
    img: '',
    intro: '',
  });

  const onChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setData({
          ...data,
          img: reader.result,
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
    setList(list.concat({ ...data, id: nextId.current }));
    nextId.current += 1;
    console.log({ ...data, id: nextId.current });
    axios.post('https://withpet.site/api/v1/dogs/register-dog', data)
      .then(() => {
      })
      .catch(() => {
      });
    setData({
      id: '',
      name: '',
      img: '',
      intro: '',
    });
  };

  const onSubmitModify = (id, modifyPetInfo) => {
    setList(list.map((pet) => (pet.id === id ? modifyPetInfo : pet)));
    axios.put(`https://withpet.site/api/v1/dogs/${id}`, modifyPetInfo)
      .then(() => {
      })
      .catch(() => {
      });
  };

  const onDelete = (id) => {
    console.log(id);
    setList(list.filter((pet) => (pet.id !== id)));
  };

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
            <Service key={row.id} item={row} onModify={onSubmitModify} onDelete={onDelete} />
          ))}
          <TableRow style={{ height: '50px' }}>
            <TableCell>5</TableCell>
            <TableCell>
              <img id="preview-image" alt="이미지 미리보기" src={!data.img ? dogimgdefault : data.img} />
              <label htmlFor="image-select">프로필 이미지 선택</label>
              <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} />
            </TableCell>
            <TableCell>
              <TextField sx={{ m: 1 }} label="이름" variant="outlined" name="name" onChange={onChange} value={data.name} required />
            </TableCell>
            <TableCell>
              <TextField sx={{ m: 1 }} label="설명" variant="outlined" name="intro" onChange={onChange} value={data.intro} required />
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
