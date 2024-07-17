import React, { useState } from "react";
import "./Pets.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dogimgdefault from "../../assets/dogProfileImage.png";
import { IAddPetReq } from "./types/parties";

interface IProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, partyId: number) => void;
  onChange: (e: any) => void;
  petInfo: IAddPetReq;
  onCancle: () => void;
  partyId: number;
}

function PetAdd({ onSubmit, onChange, petInfo, onCancle, partyId }: IProps) {
  const [isClick, setisClick] = useState(false);

  const onLocalSubmit = (e: any) => {
    onSubmit(e, partyId);
    setisClick(false);
  };

  const onChangeCalendar = (date: Dayjs | null) => {
    const e = {
      target: {
        name: "dog_birth",
        // value: dayjs(date).format("YYYY-MM-DD"),
        value: date,
      },
    };
    onChange(e);
  };

  const onLocalCancle = () => {
    onCancle();
    setisClick(false);
  };

  const addinfo = (
    <form onSubmit={onLocalSubmit}>
      <div className="pet-img-regist">
        <img
          id="preview-image"
          alt="이미지 미리보기"
          src={!petInfo.dogImg ? dogimgdefault : petInfo.dogImg}
        />
        <label htmlFor="image-select">프로필 이미지 선택</label>
        <input
          type="file"
          accept="image/*"
          id="image-select"
          style={{ display: "none" }}
          onChange={onChange}
          required
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
          value={petInfo.dogName}
          required
        />

        <TextField
          sx={{ m: 1 }}
          select
          label="견종"
          variant="outlined"
          name="dog_breed"
          onChange={onChange}
          value={petInfo.dogBreed}
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
            value={petInfo.dogBirth}
            onChange={onChangeCalendar}
            format="YYYY/MM/DD"
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
            checked={petInfo.dogGender === "male"}
            required
          />
          <label htmlFor="male">수컷</label>
          <input
            type="radio"
            name="dog_gender"
            id="female"
            value="female"
            onChange={onChange}
            checked={petInfo.dogGender === "female"}
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
            checked={petInfo.dogNeutralization === true}
          />
          <label htmlFor="O">O</label>
          <input
            type="radio"
            name="neutralization"
            id="X"
            value="false"
            onChange={onChange}
            checked={petInfo.dogNeutralization === false}
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
          value={petInfo.dogWeight}
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
          value={petInfo.dogIsbn}
          required
        />

        <input className="pet-add-btn" type="submit" value="submit" />
        <input
          className="pet-add-btn pet-add-cancel-btn"
          type="button"
          value="cancel"
          onClick={onLocalCancle}
        />
      </div>
    </form>
  );

  return (
    <div className={`${!isClick ? "pet-add" : "pet-detail"}`}>
      {isClick !== true ? (
        <AddCircleOutlineIcon
          fontSize="large"
          onClick={() => {
            setisClick(true);
          }}
          style={{ color: "rgb(181, 181, 181)" }}
        />
      ) : (
        addinfo
      )}
    </div>
  );
}

export default PetAdd;
