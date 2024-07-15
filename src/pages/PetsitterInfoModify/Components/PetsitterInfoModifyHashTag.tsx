/* eslint-disable import/no-named-as-default */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "../../PetsitterInfoManage/PetsitterInfoManage.styles";
import HashTagUpdate from "../../PetsitterInfoManage/Components/HashTagUpdate";
import petsitterInfoResigerSchema from "../../../schemas/petsitterInfoRegister.schemas";
import { putPetsitterHashTag } from "../../../services/petsitter";
import { IPetSitterHashTags, IUpdatedInfo } from "../types/petsitter.types";

interface IHashTags {
  hashTags: IPetSitterHashTags[];
}
function PetsitterInfoModifyHashTag({ hashTags }: IHashTags) {
  const newHashTagsList: IPetSitterHashTags[] = hashTags.map((tag) => {
    return { petSitterHashTagName: tag.petSitterHashTagName };
  });
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IUpdatedInfo>({
    resolver: zodResolver(petsitterInfoResigerSchema),
    defaultValues: {
      petSitterHashTags: newHashTagsList,
    },
  });

  useEffect(() => {
    if (hashTags) {
      setValue("petSitterHashTags", hashTags);
    }
  }, [setValue]);

  const prevHashTagList: IPetSitterHashTags[] = watch("petSitterHashTags");

  const onSubmit = async () => {
    const res = await putPetsitterHashTag(prevHashTagList);
    // eslint-disable-next-line no-alert
    alert(res.data.result);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HashTagUpdate
        setValue={setValue}
        errors={errors}
        value={prevHashTagList}
      />
      <div
        style={{ display: "flex", paddingTop: "30px", justifyContent: "end" }}
      >
        <S.Button onClick={onSubmit}>저장</S.Button>
      </div>
    </form>
  );
}

export default PetsitterInfoModifyHashTag;
