import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import axios from 'axios';

const Title = styled.p`
  margin-bottom: 0px;
  color: #caa969;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fffaf0;
  border-radius: 5px;
  outline: 1px solid #caa969;
  padding: 20px;
  width: fit-content;
`;

const CustomTextField = styled(TextField)`
  background-color: #fff;
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #caa969;
    }
  }
  .MuiInputLabel-root {
    color: #caa969;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: #caa969;
  color: #fff;
  padding: 5px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const CloseButton = styled.button`
  font-size: 20px;
  color: #caa969;
  background-color: Transparent;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 10px;
`;

function UserEvaluation({ id, setPrintBody }) {
  const q1 = [
    { value: 5, name: '거부감 없이 금세 적응해요' },
    { value: 4, name: '처음에 낯을 가리지만, 1-2일이 지나면 괜찮아요' },
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
    { value: 2, name: '외부 소음에 꽤 짖는 편이에요 / 헛짖음이 있어요' },
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
    // 데이터 전송 및 페이지 이동
    axios
      .put(
        `https://withpet.site/api/v1/reservation/update-dogSocialTemperature/${id}`,
        answer,
        { withCredentials: true },
      )
      .then(() => {
        // 캘린더뷰로 이동

        // 모달창
        // eslint-disable-next-line no-alert
        alert(
          '평가가 완료되었습니다. 해당 평가는 다른 펫시터가 반려견을 알아가는데 많은 도움을 줄 것입니다.',
        );
        setPrintBody(['main', 0]);
      });
  };

  const onClose = () => {
    setPrintBody(['main', 0]);
  };

  const print = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '100px auto',
      }}
    >
      <Container>
        <Form onSubmit={onSubmit}>
          <CloseButton type="button" onClick={onClose}>
            ✕
          </CloseButton>
          <Title>
            Q1. 호텔 등 낯선 공간에 맡겨지면, 어떤 반응을 보이나요? *
          </Title>
          <CustomTextField
            sx={{ m: 1 }}
            select
            label="Q1를 입력해주세요."
            variant="outlined"
            name="q1"
            style={{ width: '416px' }}
            onChange={onChange}
            value={answer.q1}
            size="small"
            required
          >
            {q1.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </CustomTextField>
          <Title>Q2. 다른 낯선 강아지를 만나면, 어떤 반응을 보이나요? *</Title>
          <CustomTextField
            sx={{ m: 1 }}
            select
            label="Q2를 입력해주세요."
            variant="outlined"
            name="q2"
            style={{ width: '416px' }}
            onChange={onChange}
            value={answer.q2}
            size="small"
            required
          >
            {q2.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </CustomTextField>
          <Title>Q3. 낯선 사람이 스킨쉽하면 어떤 반응을 보이나요? *</Title>
          <CustomTextField
            sx={{ m: 1 }}
            select
            label="Q3를 입력해주세요."
            variant="outlined"
            name="q3"
            style={{ width: '416px' }}
            onChange={onChange}
            value={answer.q3}
            size="small"
            required
          >
            {q3.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </CustomTextField>
          <Title>Q4. 평소 집에서 짖음은 어느 정도인가요? *</Title>
          <CustomTextField
            sx={{ m: 1 }}
            select
            label="Q4를 입력해주세요."
            variant="outlined"
            name="q4"
            style={{ width: '416px' }}
            onChange={onChange}
            value={answer.q4}
            size="small"
            required
          >
            {q4.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </CustomTextField>
          <Title>Q5. 배변 습관은 어떤 편인가요? *</Title>
          <CustomTextField
            sx={{ m: 1 }}
            select
            label="Q5를 입력해주세요."
            variant="outlined"
            name="q5"
            style={{ width: '416px' }}
            onChange={onChange}
            value={answer.q5}
            size="small"
            required
          >
            {q5.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </CustomTextField>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit">반려견 사회화 온도 등록</Button>
          </div>
        </Form>
      </Container>
    </div>
  );

  return <>{print}</>;
}

export default UserEvaluation;
