import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// eslint-disable-next-line import/no-named-as-default
import petsitterInfoResigerSchema from "../../../schemas/petsitterInfoRegister.schemas";
import * as S from "../../PetsitterInfoManage/PetsitterInfoManage.styles";
import { putPetsitterHouseImg } from "../../../services/petsitter";
import HouseUpdate from "../../PetsitterInfoManage/Components/HouseUpdate";
import { IPetSitterHouses, IUpdatedInfo } from "../types/petsitter.types";

interface IProps {
  houseImgList: IPetSitterHouses[];
}

function PetsitterInfoModifyHouse({ houseImgList }: IProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IUpdatedInfo>({
    resolver: zodResolver(petsitterInfoResigerSchema),
    defaultValues: {
      petSitterHouses: houseImgList,
    },
  });

  useEffect(() => {
    setValue("petSitterHouses", houseImgList);
  }, [setValue, houseImgList]);

  const prevHouseImgList = watch("petSitterHouses");
  console.log("prevHouseImgList:", prevHouseImgList);
  const onSubmit = async () => {
    const res = await putPetsitterHouseImg(prevHouseImgList);
    // eslint-disable-next-line no-alert
    alert(res.data.result);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HouseUpdate
          register={register}
          errors={errors}
          setValue={setValue}
          value={prevHouseImgList}
        />
        <div
          style={{ display: "flex", paddingTop: "30px", justifyContent: "end" }}
        >
          <S.Button
            style={{ width: "100px", height: "40px" }}
            className="submit"
            onClick={onSubmit}
          >
            저장
          </S.Button>
        </div>
      </form>
    </>
  );
}
export default PetsitterInfoModifyHouse;
