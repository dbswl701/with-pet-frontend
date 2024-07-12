import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// eslint-disable-next-line import/no-named-as-default
import petsitterInfoResigerSchema from "../../../schemas/petsitterInfoRegister.schemas";
import CriticalServiceUpdate from "../../PetsitterInfoManage/Components/CriticalServiceUpdate";
import { Button } from "../../PetsitterInfoManage/PetsitterInfoManage.styles";
import { putPetsitterCriticalService } from "../../../services/petsitter";
import {
  ICriticalServicesRes,
  IIncludedCriticalServices,
  IPetSitterCriticalServicesRes,
  IUpdatedInfo,
} from "../types/petsitter.types";
import { usePostCriticalService } from "../../../hooks/usePetsitterInfoMutation";

interface IProps {
  criticalServices: ICriticalServicesRes[];
  criticalSelectList: IPetSitterCriticalServicesRes[];
}

function PetsitterInfoModifyCritical({
  criticalServices,
  criticalSelectList,
}: IProps) {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdatedInfo>({
    resolver: zodResolver(petsitterInfoResigerSchema),
  });
  const [isCriticalServiceIdIncluded, setIsCriticalServiceIdIncluded] =
    useState<IIncludedCriticalServices[]>([]);
  const [localCriticalServiceSelectList, setLocalCriticalServiceSelectList] =
    useState<IPetSitterCriticalServicesRes[]>(criticalSelectList);

  const { mutate } = usePostCriticalService();

  useEffect(() => {
    const includedServices: IIncludedCriticalServices[] = criticalServices?.map(
      (service) => {
        const isIncluded = localCriticalServiceSelectList.some(
          (sitterService) =>
            sitterService.criticalServiceId === service.criticalServiceId,
        );
        const selected = localCriticalServiceSelectList.find(
          (sitterService) =>
            sitterService.criticalServiceId === service.criticalServiceId,
        );
        const petSitterCriticalServicePrice = selected
          ? selected.petSitterCriticalServicePrice
          : null;
        return { ...service, isIncluded, petSitterCriticalServicePrice };
      },
    );
    setIsCriticalServiceIdIncluded(includedServices);
  }, [criticalSelectList, localCriticalServiceSelectList]);

  const onRemoveCriticalService = (id: number) => {
    setLocalCriticalServiceSelectList(
      localCriticalServiceSelectList.filter(
        (service) => service.criticalServiceId !== id,
      ),
    );
  };

  const onAddCriticalService = (id: number, price: string) => {
    const newCriticalService: ICriticalServicesRes[] = criticalServices.filter(
      (service) => {
        return service.criticalServiceId == id;
      },
    );
    const newCriticalService2: IPetSitterCriticalServicesRes = {
      ...newCriticalService[0],
      petSitterCriticalServiceId: 0,
      petSitterCriticalServicePrice: parseInt(price, 10),
    };
    const newServiceList = [...criticalSelectList, newCriticalService2];

    setLocalCriticalServiceSelectList(newServiceList);
    setValue("petSitterCriticalServices", newServiceList, {
      shouldValidate: true,
    });
  };
  const onSubmit = async () => {
    const petSitterCriticalServiceRequests = localCriticalServiceSelectList.map(
      (item) => ({
        petSitterCriticalServicePrice: item.petSitterCriticalServicePrice,
        criticalServiceId: item.criticalServiceId,
      }),
    );
    mutate(petSitterCriticalServiceRequests);
    // const res = await putPetsitterCriticalService(
    //   petSitterCriticalServiceRequests,
    // );
    // eslint-disable-next-line no-alert
    // alert(res.data.result);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CriticalServiceUpdate
        errors={errors}
        isCriticalServiceIdIncluded={isCriticalServiceIdIncluded}
        onRemoveCriticalService={onRemoveCriticalService}
        onAddCriticalService={onAddCriticalService}
      />
      <div
        style={{ display: "flex", paddingTop: "30px", justifyContent: "end" }}
      >
        <Button onClick={onSubmit}>저장</Button>
      </div>
    </form>
  );
}

export default PetsitterInfoModifyCritical;
