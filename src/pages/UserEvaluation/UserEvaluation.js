import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

const Title = styled.p`
  margin-bottom: 0px;
`;

function UserEvaluation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const q1 = [
    { value: 5, name: '거부감 없이 금세 적응해요' },
    { value: 4, name: '처음에 낯을 가리지만 , 1-2일이 지나면 괜찮아요' },
    { value: 1, name: '계속 불안해하거나 스트레스를 받아요' },
    { value: 3, name: '잘 모르겠어요' },
  ];

  const q2 = [
    { value: 5, name: '좋아하며 적극적으로 어울려요' },
    { value: 4, name: '처음엔 낯을 가리는 편이에요' },
    { value: 1, name: '짖거나 으르렁대며 경계를 해요' },
    { value: 2, name: '무서워하며 피하려고 해요' },
    { value: 3, name: '별로 관심이 없어요' },
  ];

  const q3 = [
    { value: 5, name: '거부감 없이 좋아해요' },
    { value: 4, name: '초반에 낯가림은 있지만 물지는 않아요' },
    { value: 1, name: '오랫동안 만지면 으르렁 대거나 물수도 있어요' },
    { value: 2, name: '겁이 많아서 만지면 물 수도 있어요' },
  ];

  const q4 = [
    { value: 5, name: '거의 짖지 않아요' },
    { value: 3, name: '상황에 따라 가끔 짖어요' },
    { value: 2, name: '외부소음에 꽤 짖는 편이에요 / 헛짖음이 있어요' },
  ];

  const q5 = [
    { value: 5, name: '배변패드에 잘 가려요' },
    { value: 2, name: '아직 배변 실수가 있어요' },
    { value: 3, name: '실외 배변만 해요' },
  ];

  const [answer, setAnswer] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setAnswer({
      ...answer,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://withpet.site/api/v1/dogs/temperature/${id}`, answer, { withCredentials: true })
      .then(() => {
        navigate('../petlist');
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={onSubmit}>
        <Title>Q1. 호텔 등 낯선 공간에 맡겨지면,어떤 반응을 보이나요 ? *</Title>
        <TextField sx={{ m: 1 }} select label="Q1를 입력해주세요." variant="outlined" name="q1" style={{ width: '416px' }} onChange={onChange} value={answer.q1} size="small" required>
          { q1.map((item) => <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
        </TextField>
        <Title>Q2. 다른 낯선 강아지를 만나면, 어떤 반응을 보이나요? *</Title>
        <TextField sx={{ m: 1 }} select label="Q2를 입력해주세요." variant="outlined" name="q2" style={{ width: '416px' }} onChange={onChange} value={answer.q2} size="small" required>
          { q2.map((item) => <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
        </TextField>
        <Title>Q3. 낯선 사람이 스킨쉽하면 어떤 반응을 보이나요  ? *</Title>
        <TextField sx={{ m: 1 }} select label="Q3를 입력해주세요." variant="outlined" name="q3" style={{ width: '416px' }} onChange={onChange} value={answer.q3} size="small" required>
          { q3.map((item) => <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
        </TextField>
        <Title>Q4. 평소 집에서 짖음은 어느정도인가요 ? *</Title>
        <TextField sx={{ m: 1 }} select label="Q4를 입력해주세요." variant="outlined" name="q4" style={{ width: '416px' }} onChange={onChange} value={answer.q4} size="small" required>
          { q4.map((item) => <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
        </TextField>
        <Title>Q5. 배변 습관은 어떤 편인가요 ? *</Title>
        <TextField sx={{ m: 1 }} select label="Q5를 입력해주세요." variant="outlined" name="q5" style={{ width: '416px' }} onChange={onChange} value={answer.q5} size="small" required>
          { q5.map((item) => <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
        </TextField>
        <div>
          <input type="submit" value="완료하기" style={{ width: '400px', height: '50px', marginTop: '20px' }} />
        </div>
      </form>
    </div>
  );
}

export default UserEvaluation;
