/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../PetsitterInfoManage/PetsitterInfoManage.styles";
import WithPetServiceUpdate from "../../PetsitterInfoManage/Components/WithPetServiceUpdate";
import petsitterInfoResigerSchema from "../../../schemas/petsitterInfoRegister.schemas";
import { putPetsitterService } from "../../../services/petsitter";
import {
  IIncludedServices,
  IPetSitterWithPetServices,
  IPetSitterWithPetServicesRes,
  IUpdatedInfo,
  IWithPetServicesRes,
} from "../types/petsitter.types";

interface IProps {
  serviceSelectList: IPetSitterWithPetServicesRes[];
  withPetServices: IWithPetServicesRes[];
}
function PetsitterInfoModifyService({
  serviceSelectList,
  withPetServices,
}: IProps) {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdatedInfo>({
    resolver: zodResolver(petsitterInfoResigerSchema),
  });
  const [isServiceIdIncluded, setIsServiceIdIncluded] = useState<
    IIncludedServices[]
  >([]);
  const [localServiceSelectList, setLocalServiceSelectList] =
    useState<IPetSitterWithPetServicesRes[]>(serviceSelectList);

  useEffect(() => {
    const includedServices: IIncludedServices[] = withPetServices?.map(
      (service) => {
        const isIncluded = localServiceSelectList.some(
          (sitterService) =>
            sitterService.withPetServiceId === service.withPetServiceId,
        );
        const selected = localServiceSelectList.find(
          (sitterService) =>
            sitterService.withPetServiceId === service.withPetServiceId,
        );
        const petSitterWithPetServicePrice = selected
          ? selected.petSitterWithPetServicePrice
          : null;
        return { ...service, isIncluded, petSitterWithPetServicePrice };
      },
    );

    setIsServiceIdIncluded(includedServices);
  }, [serviceSelectList, localServiceSelectList]);

  const onRemoveService = (id: number) => {
    const newServiceList = localServiceSelectList.filter(
      (service) => service.withPetServiceId !== id,
    );
    setLocalServiceSelectList(newServiceList);
    setValue("petSitterWithPetServices", newServiceList, {
      shouldValidate: true,
    });
  };

  const onAddService = (id: number, price: string) => {
    const newService: IWithPetServicesRes[] = withPetServices.filter(
      (service) => {
        return service.withPetServiceId == id;
      },
    );
    const newService2: IPetSitterWithPetServicesRes = {
      ...newService[0],
      petSitterWithPetServiceId: 0,
      petSitterWithPetServicePrice: parseInt(price, 10),
    };
    const newServiceList = [...serviceSelectList, newService2];
    setValue("petSitterWithPetServices", newServiceList, {
      shouldValidate: true,
    });
    setLocalServiceSelectList(newServiceList);
  };

  const onSubmit = async () => {
    const petSitterWithPetServicePrice: IPetSitterWithPetServices[] =
      localServiceSelectList.map((item) => ({
        petSitterWithPetServicePrice: item.petSitterWithPetServicePrice,
        withPetServiceId: item.withPetServiceId,
      }));
    const res = await putPetsitterService(petSitterWithPetServicePrice);
    // eslint-disable-next-line no-alert
    alert(res.data.result);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WithPetServiceUpdate
        errors={errors}
        isServiceIdIncluded={isServiceIdIncluded}
        onRemoveService={onRemoveService}
        onAddService={onAddService}
      />
      <div
        style={{ display: "flex", paddingTop: "30px", justifyContent: "end" }}
      >
        <Button onClick={onSubmit}>저장</Button>
      </div>
    </form>
  );
}
export default PetsitterInfoModifyService;
