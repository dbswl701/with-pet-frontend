/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import * as S from "../PetsitterInfoManage.styles";
import AddIcon from "../../../assets/AddIcon.png";
import PostFileUpload from "../../../services/upload";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import {
  IPetSitterHouses,
  IUpdatedInfo,
} from "../../PetsitterInfoModify/types/petsitter.types";

interface IProps {
  register: UseFormRegister<IUpdatedInfo>;
  errors: FieldErrors<IUpdatedInfo>;
  setValue: UseFormSetValue<IUpdatedInfo>;
  value: IPetSitterHouses[];
}

function HouseUpdate({ register, errors, setValue, value }: IProps) {
  const [houseImgList, setHouseImgList] = useState(value || []);

  useEffect(() => {
    if (value) setHouseImgList(value);
    console.log("value:", value);
  }, [value]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    const res = await PostFileUpload(formData);
    res.data.result.forEach((img: string, index: number) => {
      const temp = {
        petSitterHouseRepresentative: index === 0,
        petSitterHouseImg: img,
      };
      const updatedList = [...houseImgList, temp];
      setHouseImgList(updatedList);
      setValue("petSitterHouses", updatedList, { shouldValidate: true });
    });
  };
  const onRemoveHouseImg = (id: string) => {
    const removeHouseImg = houseImgList.filter(
      (img) => img.petSitterHouseImg === id,
    );
    const updateHouseImg = houseImgList.filter(
      (img) => img.petSitterHouseImg !== id,
    );
    setHouseImgList(updateHouseImg);
    setValue("petSitterHouses", updateHouseImg, { shouldValidate: true });

    if (removeHouseImg[0].petSitterHouseRepresentative === true) {
      const temp = updateHouseImg.map((img, index) => {
        if (index === 0) {
          return { ...img, petSitterHouseRepresentative: true };
        }
        return img;
      });
      setHouseImgList(temp);
      setValue("petSitterHouses", temp);
    }
  };

  return (
    <>
      <S.Title>집사진</S.Title>
      <S.HouseImgList>
        <S.HouseImgContainer>
          <S.HouseImgInput
            id="file"
            multiple
            type="file"
            {...register("petSitterHouses", { required: true })}
            accept="image/*"
            onChange={handleImageUpload}
          />
          <S.HouseImgLabel htmlFor="file">
            <img src={AddIcon} alt="추가" />
          </S.HouseImgLabel>
        </S.HouseImgContainer>
        {houseImgList &&
          houseImgList.map((img, index) => (
            <S.HouseImgContainer key={img.petSitterHouseImg}>
              <S.HouseImg
                src={img.petSitterHouseImg}
                alt="집사진"
                isRepresentative={index === 0}
                onClick={() => onRemoveHouseImg(img.petSitterHouseImg)}
                isModify
              />
            </S.HouseImgContainer>
          ))}
      </S.HouseImgList>
      {/* 오류 출력 */}
      {errors.petSitterHouses && (
        <S.ErrorMsg>{errors.petSitterHouses.message}</S.ErrorMsg>
      )}
    </>
  );
}

export default HouseUpdate;
