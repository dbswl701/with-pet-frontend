import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { IModifyPetReq, IPartyDogList } from "./types/parties";

interface IProps {
  onSubmit: (
    partyId: number,
    dogId: number,
    modifyPetInfo: IModifyPetReq
  ) => void;
  petInfo: IPartyDogList;
  onToggle: (str: string) => void;
  partyId: number;
}

function PetModify({ onSubmit, petInfo, onToggle, partyId }: IProps) {
  const [modifyPetInfo, setModifyPetInfo] = useState<IModifyPetReq>({
    dogName: petInfo.dogName,
    dogBreed: petInfo.dogBreed,
    dogBirth: petInfo.dogBirth,
    dogGender: petInfo.dogGender,
    dogNeutralization: petInfo.dogNeutralization ? true : false,
    dogWeight: petInfo.dogWeight,
    dogImg: petInfo.dogImg,
    // dogIsbn: petInfo.dogIsbn,
  });
  console.log("수정수정! modifyPetInfo: ", modifyPetInfo);

  // 생일 임시 저장
  const [birth, setBirth] = useState(petInfo.dogBirth);
  // const birth = dayjs(modifyPetInfo.dogBirth);
  useEffect(() => {}, [birth]);
  const handleImageUpload = async (e: any) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("https://withpet.site/api/v1/file/upload", formData, config)
      .then((res) => {
        setModifyPetInfo({
          ...modifyPetInfo,
          dogImg: res.data.result[0],
        });
      });
  };

  const onChange = (e: any) => {
    if (e.target.files) {
      handleImageUpload(e);
    } else {
      const { value, name } = e.target;
      console.log("?????? value:", value, "name:", name);
      setModifyPetInfo({
        ...modifyPetInfo,
        [name]: value,
      });
    }
  };

  const onLocalSubmit = (e: any) => {
    e.preventDefault();
    onToggle("detail");
    setModifyPetInfo({
      ...modifyPetInfo,
      dogNeutralization: modifyPetInfo.dogNeutralization === true,
    });
    onSubmit(partyId, petInfo.dogId, modifyPetInfo);
  };

  const onChangeCalendar = (date: Dayjs | null) => {
    // const e = {
    //   target: {
    //     name: "dogBirth",
    //     value: dayjs(date).format("YYYY-MM-DD"),
    //   },
    // };
    console.log("날짜 좀 나와라", dayjs(date).format("YYYY-MM-DD"));
    setModifyPetInfo({
      ...modifyPetInfo,
      dogBirth: dayjs(date).format("YYYY-MM-DD"),
    });
    // onChange(e);
  };

  const modify = (
    <form onSubmit={onLocalSubmit}>
      <div className="pet-img-regist">
        <img
          id="preview-image"
          alt="이미지 미리보기"
          src={modifyPetInfo.dogImg}
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
          name="dogName"
          onChange={onChange}
          value={modifyPetInfo.dogName}
          required
        />

        <TextField
          sx={{ m: 1 }}
          select
          label="견종"
          variant="outlined"
          name="dogBreed"
          onChange={onChange}
          value={modifyPetInfo.dogBreed}
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
            // value={new Date(modifyPetInfo.dogBirth)}
            value={dayjs(modifyPetInfo.dogBirth)}
            onChange={onChangeCalendar}
            // onChange={() => onChangeCalendar(dayjs(modifyPetInfo.dogBirth))}
            format="YYYY/MM/DD"
          />
        </LocalizationProvider>

        <div className="select">
          <p>성별 선택</p>
          <input
            type="radio"
            name="dogGender"
            id="MALE"
            value="MALE"
            onChange={onChange}
            checked={modifyPetInfo.dogGender === "MALE"}
          />
          <label htmlFor="MALE">남자</label>
          <input
            type="radio"
            name="dogGender"
            id="FEMALE"
            value="FEMALE"
            onChange={onChange}
            checked={modifyPetInfo.dogGender === "FEMALE"}
          />
          <label htmlFor="FEMALE">여자</label>
        </div>

        <div className="select">
          <p>중성화 여부 선택</p>
          <input
            type="radio"
            name="dogNeutralization"
            id="O"
            value="true"
            onChange={onChange}
            checked={modifyPetInfo.dogNeutralization === true}
          />
          <label htmlFor="O">O</label>
          <input
            type="radio"
            name="dogNeutralization"
            id="X"
            value="false"
            onChange={onChange}
            checked={modifyPetInfo.dogNeutralization === false}
          />
          <label htmlFor="X">X</label>
        </div>
        <TextField
          sx={{ m: 1 }}
          label="무게"
          type="number"
          variant="outlined"
          size="small"
          name="dogWeight"
          onChange={onChange}
          value={modifyPetInfo.dogWeight}
          required
        />

        <TextField
          sx={{ m: 1 }}
          label="등록코드"
          type="number"
          variant="outlined"
          size="small"
          name="dogIsbn"
          // onChange={onChange}
          value={petInfo.dogIsbn}
          disabled
          required
        />
        <input className="pet-add-btn" type="submit" value="수정" />
        <input
          className="pet-add-btn pet-add-cancel-btn"
          type="button"
          value="취소"
          onClick={() => onToggle("detail")}
        />
      </div>
    </form>
  );
  return <>{modify}</>;
}

export default PetModify;
