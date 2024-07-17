import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import dogimgdefault from "../../assets/dogProfileImage.png";
import { IPartyReq } from "./types/parties";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (date: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  partyInfo: IPartyReq;
  setPartyInfo: React.Dispatch<React.SetStateAction<IPartyReq>>;
}

function CreateParty({
  open,
  setOpen,
  onChange,
  onSubmit,
  partyInfo,
  setPartyInfo,
}: IProps) {
  const onChangeCalendar = (date: Date) => {
    const e = {
      target: {
        name: "dog_birth",
        value: dayjs(date).format("YYYY-MM-DD"),
      },
    };
    onChange(e);
  };
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  const onLocalCancle = () => {
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
    setOpen(false);
  };
  const checkDay = dayjs(partyInfo.partyDogBirth).toDate();
  console.log("checkDay: ", checkDay, "date: ", new Date());
  const addinfo = (
    <form onSubmit={onSubmit}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="pet-img-regist">
          <img
            id="preview-image"
            alt="이미지 미리보기"
            src={!partyInfo.partyDogImg ? dogimgdefault : partyInfo.partyDogImg}
          />
          <label htmlFor="image-select">프로필 이미지 선택</label>
          <input
            type="file"
            accept="image/*"
            id="image-select"
            style={{ display: "none" }}
            onChange={onChange}
          />
        </div>
        <div className="pet-info-regist">
          <TextField
            sx={{ m: 1 }}
            label="이름"
            variant="outlined"
            size="small"
            name="dog_name"
            onChange={onChange}
            value={partyInfo.partyDogName}
            required
          />

          <TextField
            sx={{ m: 1 }}
            select
            label="견종"
            variant="outlined"
            name="dog_breed"
            onChange={onChange}
            value={partyInfo.partyDogBreed}
            size="small"
            required
          >
            <MenuItem value="진돗개">진돗개</MenuItem>
            <MenuItem value="삽살개">삽살개</MenuItem>
            <MenuItem value="리트리버">리트리버</MenuItem>
            <MenuItem value="요크셔테리어">요크셔테리어</MenuItem>
            <MenuItem value="말티즈">말티즈</MenuItem>
            <MenuItem value="푸들">푸들</MenuItem>
            <MenuItem value="시바견">시바견</MenuItem>
            <MenuItem value="불독">불독</MenuItem>
            <MenuItem value="비글">비글</MenuItem>
            <MenuItem value="포메라니안">포메라니안</MenuItem>
            <MenuItem value="치와와">치와와</MenuItem>
            <MenuItem value="보더콜리">보더콜리</MenuItem>
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ m: 1 }}
              label="생일"
              value={dayjs(partyInfo.partyDogBirth).toDate()}
              onChange={() =>
                onChangeCalendar(dayjs(partyInfo.partyDogBirth).toDate())
              }
              // name="partyDogBirth"
              format="YYYY/MM/DD"
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>

          <div className="select">
            <p>성별 선택</p>
            <input
              type="radio"
              name="dog_gender"
              id="male"
              value="male"
              onChange={onChange}
              checked={partyInfo.partyDogGender === "male"}
              required
            />
            <label htmlFor="male">수컷</label>
            <input
              type="radio"
              name="dog_gender"
              id="female"
              value="female"
              onChange={onChange}
              checked={partyInfo.partyDogGender === "female"}
            />
            <label htmlFor="female">암컷</label>
          </div>

          <div className="select">
            <p>중성화 여부 선택</p>
            <input
              type="radio"
              name="neutralization"
              id="O"
              value="true"
              onChange={onChange}
              checked={partyInfo.partyDogNeutralization === true}
            />
            <label htmlFor="O">O</label>
            <input
              type="radio"
              name="neutralization"
              id="X"
              value="false"
              onChange={onChange}
              checked={partyInfo.partyDogNeutralization === false}
            />
            <label htmlFor="X">X</label>
          </div>

          <TextField
            sx={{ m: 1 }}
            label="무게"
            type="number"
            variant="outlined"
            size="small"
            name="dog_weight"
            onChange={onChange}
            value={partyInfo.partyDogWeight}
            required
          />

          <TextField
            sx={{ m: 1 }}
            label="등록코드"
            type="number"
            variant="outlined"
            size="small"
            name="dog_isbn"
            onChange={onChange}
            value={partyInfo.partyDogIsbn}
            required
          />

          <TextField
            sx={{ m: 1 }}
            label="그룹 이름"
            variant="outlined"
            size="small"
            name="partyName"
            onChange={onChange}
            value={partyInfo.partyName}
            required
          />

          <input className="pet-add-btn" type="submit" value="submit" />
        </div>
      </div>
    </form>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{ margin: "40px" }}
      >
        <Box
          sx={{
            width: 800,
            height: 550,
            display: "flex",
            flexDirection: "column",
            justifyContent: "top",
            alignItems: "center",
            bgcolor: "background.paper",
            boxShadow: 24,
            margin: "auto",
            overflowY: "scroll",
            p: 2,
            backgroundColor: "#FAF6F0",
          }}
        >
          {addinfo}
          <Button type="button" onClick={onLocalCancle}>
            닫기
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateParty;
