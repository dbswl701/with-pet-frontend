/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import * as S from "../PetsitterInfoManage.styles";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";

interface IProps {
  register: UseFormRegister<{
    petSitterIntroduction: string;
  }>;
  errors: FieldErrors<{
    petSitterIntroduction: string;
  }>;
  trigger: UseFormTrigger<{
    petSitterIntroduction: string;
  }>;
}

function IntroUpdate({ register, errors, trigger }: IProps) {
  const handleTrigger = () => {
    trigger("petSitterIntroduction");
  };
  return (
    <div>
      <S.Title>소개글</S.Title>
      <S.IntroTextField
        {...register("petSitterIntroduction", { required: true })}
        onBlur={handleTrigger}
      />
      {errors.petSitterIntroduction && (
        <S.ErrorMsg>{errors.petSitterIntroduction.message}</S.ErrorMsg>
      )}
    </div>
  );
}

export default IntroUpdate;
