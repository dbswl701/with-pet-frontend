import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Options from "./Options";
import {
  IPetsitterDetail,
  IReservationDogs,
  IReservationInfo,
} from "../../PetList/types/petsitter";
import CheckCalendar from "./CheckCalendar";
import DateRangePicker from "./DateRangePicker";
// import AvailableCalendar from './AvailableCalendar';

const Container = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #caa969;
  margin-top: 30px;
`;

const Wrapper1 = styled.div`
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0px 3px 4px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  border-radius: 10px;
`;

interface IProps {
  data: IPetsitterDetail | undefined;
  dogList: IReservationDogs[];
  petsitterId: string | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPayInfo: any;
}

function Reservation({
  dogList,
  data,
  petsitterId,
  setOpen,
  setPayInfo,
}: IProps) {
  const [reservationInfo, setReservationInfo] = useState<IReservationInfo>({
    startDate: "",
    endDate: "",
    checkinTime: "",
    checkoutTime: "",
    dogId: "",
    optionId: [],
    // petSitterId: 0,
  });

  const [reset, setReset] = useState(false);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReservationInfo({
      ...reservationInfo,
      [name]: value,
    });
  };

  const onChangeOption = (list: any) => {
    setReservationInfo({
      ...reservationInfo,
      optionId: list,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const temp = {
      checkIn: `${reservationInfo.startDate}T${reservationInfo.checkinTime}:00:00`,
      checkOut: `${reservationInfo.endDate}T${reservationInfo.checkoutTime}:00:00`,
      dogId: reservationInfo.dogId,
      optionId: reservationInfo.optionId,
      petsitterId: Number(petsitterId),
    };
    if (!reservationInfo.startDate || !reservationInfo.endDate) {
      // eslint-disable-next-line no-alert
      alert("체크인 체크아웃 날짜를 선택해주세요.");
      return;
    }
    axios
      .post("https://withpet.site/api/v1/reservation", temp, {
        withCredentials: true,
      })
      .then((res) => {
        setReservationInfo({
          startDate: "",
          endDate: "",
          checkinTime: "",
          checkoutTime: "",
          dogId: "",
          optionId: [],
        });
        setReset((prev) => !prev);
        setPayInfo(res.data.result);
        setOpen(true);
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setReservationInfo({
            startDate: "",
            endDate: "",
            checkinTime: "",
            checkoutTime: "",
            dogId: "",
            optionId: [],
          });
          setReset((prev) => !prev);
          // eslint-disable-next-line no-alert
          alert(err.response.data.message);
        }
      });
  };

  console.log("예약 정보 확인: ", reservationInfo);
  return (
    <>
      <Container>
        <Wrapper1>
          <Title>체크인 / 체크아웃 날짜</Title>
          <DateRangePicker
            petsitterId={petsitterId}
            setReservationInfo={setReservationInfo}
          />
          <form onSubmit={onSubmit}>
            <div>
              <Title>체크인 / 체크아웃 시간</Title>
              <TextField
                sx={{ m: 1 }}
                select
                label="체크인 시간"
                variant="outlined"
                name="checkinTime"
                style={{ width: "138px", height: "40px" }}
                onChange={onChange}
                value={reservationInfo.checkinTime}
                required
              >
                <MenuItem value="00">오전 12:00</MenuItem>
                <MenuItem value="01">오전 01:00</MenuItem>
                <MenuItem value="02">오전 02:00</MenuItem>
                <MenuItem value="03">오전 03:00</MenuItem>
                <MenuItem value="04">오전 04:00</MenuItem>
                <MenuItem value="05">오전 05:00</MenuItem>
                <MenuItem value="06">오전 06:00</MenuItem>
                <MenuItem value="07">오전 07:00</MenuItem>
                <MenuItem value="08">오전 08:00</MenuItem>
                <MenuItem value="09">오전 09:00</MenuItem>
                <MenuItem value="10">오전 10:00</MenuItem>
                <MenuItem value="11">오전 11:00</MenuItem>

                <MenuItem value="12">오후 12:00</MenuItem>
                <MenuItem value="13">오후 01:00</MenuItem>
                <MenuItem value="14">오후 02:00</MenuItem>
                <MenuItem value="15">오후 03:00</MenuItem>
                <MenuItem value="16">오후 04:00</MenuItem>
                <MenuItem value="17">오후 05:00</MenuItem>
                <MenuItem value="18">오후 06:00</MenuItem>
                <MenuItem value="19">오후 07:00</MenuItem>
                <MenuItem value="20">오후 08:00</MenuItem>
                <MenuItem value="21">오후 09:00</MenuItem>
                <MenuItem value="22">오후 10:00</MenuItem>
                <MenuItem value="23">오후 11:00</MenuItem>
              </TextField>
              <TextField
                sx={{ m: 1 }}
                select
                label="체크아웃 시간"
                variant="outlined"
                name="checkoutTime"
                style={{ width: "138px", height: "40px" }}
                onChange={onChange}
                value={reservationInfo.checkoutTime}
                required
              >
                <MenuItem value="00">오전 12:00</MenuItem>
                <MenuItem value="01">오전 01:00</MenuItem>
                <MenuItem value="02">오전 02:00</MenuItem>
                <MenuItem value="03">오전 03:00</MenuItem>
                <MenuItem value="04">오전 04:00</MenuItem>
                <MenuItem value="05">오전 05:00</MenuItem>
                <MenuItem value="06">오전 06:00</MenuItem>
                <MenuItem value="07">오전 07:00</MenuItem>
                <MenuItem value="08">오전 08:00</MenuItem>
                <MenuItem value="09">오전 09:00</MenuItem>
                <MenuItem value="10">오전 10:00</MenuItem>
                <MenuItem value="11">오전 11:00</MenuItem>

                <MenuItem value="12">오후 12:00</MenuItem>
                <MenuItem value="13">오후 01:00</MenuItem>
                <MenuItem value="14">오후 02:00</MenuItem>
                <MenuItem value="15">오후 03:00</MenuItem>
                <MenuItem value="16">오후 04:00</MenuItem>
                <MenuItem value="17">오후 05:00</MenuItem>
                <MenuItem value="18">오후 06:00</MenuItem>
                <MenuItem value="19">오후 07:00</MenuItem>
                <MenuItem value="20">오후 08:00</MenuItem>
                <MenuItem value="21">오후 09:00</MenuItem>
                <MenuItem value="22">오후 10:00</MenuItem>
                <MenuItem value="23">오후 11:00</MenuItem>
              </TextField>
              <Title>반려동물 선택</Title>
              <TextField
                sx={{ m: 1 }}
                select
                label="반려견 선택"
                variant="outlined"
                name="dogId"
                style={{ width: "300px" }}
                onChange={onChange}
                value={reservationInfo.dogId}
                required
              >
                {dogList.map((dog) => (
                  <MenuItem
                    key={dog.dogId}
                    value={dog.dogId}
                    disabled={!dog.petReservationAvailable}
                  >
                    {dog.name}
                  </MenuItem>
                ))}
              </TextField>
              <Title>옵션 선택</Title>
              {data?.petSitterWithPetServices && (
                <Options
                  services={data.petSitterWithPetServices}
                  reset={reset}
                  onChange={onChangeOption}
                />
              )}
            </div>
            <input
              type="submit"
              value="예약 하기"
              style={{
                width: "285px",
                height: "50px",
                margin: "auto",
                borderRadius: "10px",
                backgroundColor: "#CAA969",
                color: "white",
                marginBottom: "30px",
              }}
            />
          </form>
        </Wrapper1>
        <Wrapper1>
          <Title>이용 요금(데이케어)</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            {data?.petSitterCriticalServices.map((item) => (
              <div
                key={item.petSitterCriticalServiceId}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <img
                    src={item.criticalServiceImg}
                    alt="서비스 이미지"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                </div>
                <div>
                  <p>
                    {item.criticalServiceName} /{" "}
                    {item.criticalServiceIntroduction} /{" "}
                    {item.petSitterCriticalServicePrice}원
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Wrapper1>
        {/* <AvailableCalendar petsitterId={petsitterId} /> */}
      </Container>
    </>
  );
}

export default Reservation;
