import * as S from "../PetsitterInfoManage.styles";
import ServiceItem from "./ServiceItem";
import { FieldErrors } from "react-hook-form";
import {
  IIncludedServices,
  IUpdatedInfo,
} from "../../PetsitterInfoModify/types/petsitter.types";

interface IProps {
  errors: FieldErrors<IUpdatedInfo>;
  isServiceIdIncluded: IIncludedServices[];
  onRemoveService: (id: number) => void;
  onAddService: (id: number, price: string) => void;
}

function WithPetServiceUpdate({
  errors,
  isServiceIdIncluded,
  onRemoveService,
  onAddService,
}: IProps) {
  return (
    <div>
      <S.Title>이용 가능 서비스</S.Title>
      <S.ServiceList>
        {isServiceIdIncluded?.map((service) => (
          <ServiceItem
            key={service.withPetServiceId}
            price={service.petSitterWithPetServicePrice}
            isIncluded={service.isIncluded}
            serviceImg={service.withPetServiceImg}
            serviceName={service.withPetServiceName}
            serviceIntroduction={service.withPetServiceIntroduction}
            serviceId={service.withPetServiceId}
            onRemove={onRemoveService}
            onAdd={onAddService}
          />
        ))}
      </S.ServiceList>
      {errors.petSitterWithPetServices && (
        <S.ErrorMsg>{errors.petSitterWithPetServices.message}</S.ErrorMsg>
      )}
    </div>
  );
}

export default WithPetServiceUpdate;
