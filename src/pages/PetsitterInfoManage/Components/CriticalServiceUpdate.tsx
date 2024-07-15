import React from "react";
import * as S from "../PetsitterInfoManage.styles";
import ServiceItem from "./ServiceItem";
import { FieldErrors, FieldValues } from "react-hook-form";
import {
  IIncludedCriticalServices,
  IUpdatedInfo,
} from "../../PetsitterInfoModify/types/petsitter.types";

interface IProps {
  errors: FieldErrors<IUpdatedInfo>;
  isCriticalServiceIdIncluded: IIncludedCriticalServices[];
  onRemoveCriticalService: (id: number) => void;
  onAddCriticalService: (id: number, price: string) => void;
}

function CriticalServiceUpdate({
  errors,
  isCriticalServiceIdIncluded,
  onRemoveCriticalService,
  onAddCriticalService,
}: IProps) {
  console.log("errror: ", errors);
  return (
    <div>
      <S.Title>필수 서비스</S.Title>
      <S.ServiceList>
        {isCriticalServiceIdIncluded &&
          isCriticalServiceIdIncluded.map((service) => (
            <ServiceItem
              key={service.criticalServiceId}
              price={service.petSitterCriticalServicePrice}
              isIncluded={service.isIncluded}
              serviceImg={service.criticalServiceImg}
              serviceName={service.criticalServiceName}
              serviceIntroduction={service.criticalServiceIntroduction}
              serviceId={service.criticalServiceId}
              onRemove={onRemoveCriticalService}
              onAdd={onAddCriticalService}
            />
          ))}
      </S.ServiceList>
      {errors.petSitterCriticalServices && (
        <S.ErrorMsg>{errors.petSitterCriticalServices.message}</S.ErrorMsg>
      )}
    </div>
  );
}

export default CriticalServiceUpdate;
