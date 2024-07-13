import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// eslint-disable-next-line import/no-named-as-default
import petsitterInfoResigerSchema from '../../../schemas/petsitterInfoRegister.schemas';
import CriticalServiceUpdate from '../../PetsitterInfoManage/Components/CriticalServiceUpdate';
import { Button } from '../../PetsitterInfoManage/PetsitterInfoManage.styles';
import { putPetsitterCriticalService } from '../../../services/petsitter';

function PetsitterInfoModifyCritical({ criticalServices, criticalSelectList, setCriticalSelectList }) {
  const {
    handleSubmit, setValue, formState: { errors },
  } = useForm({
    resolver: zodResolver(petsitterInfoResigerSchema),
  });
  const [isCriticalServiceIdIncluded, setIsCriticalServiceIdIncluded] = useState([]);
  useEffect(() => {
    const includedServices = criticalServices && criticalServices.map((service) => {
      const isIncluded = criticalSelectList.some((sitterService) => sitterService.criticalServiceId === service.criticalServiceId);
      const selected = criticalSelectList.find((sitterService) => sitterService.criticalServiceId === service.criticalServiceId);
      const price = selected ? selected.petSitterCriticalServicePrice : null;
      return { ...service, isIncluded, price };
    });
    setIsCriticalServiceIdIncluded(includedServices);
    setValue('petSitterCriticalServices', includedServices);
  }, [criticalSelectList]);

  const onRemoveCriticalService = (id) => {
    setCriticalSelectList(criticalSelectList.filter((service) => service.criticalServiceId !== id));
  };

  const onAddCriticalService = (id, price) => {
    const newServiceList = [...criticalSelectList, { criticalServiceId: id, petSitterCriticalServicePrice: parseInt(price, 10) }];
    setCriticalSelectList(newServiceList);
    setValue('petSitterWithPetServices', newServiceList, { shouldValidate: true });
  };
  const onSubmit = async () => {
    const petSitterCriticalServiceRequests = criticalSelectList.map((item) => ({
      petSitterCriticalServicePrice: item.petSitterCriticalServicePrice,
      criticalServiceId: item.criticalServiceId,
    }));
    const res = await putPetsitterCriticalService(petSitterCriticalServiceRequests);
    // eslint-disable-next-line no-alert
    alert(res.data.result);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CriticalServiceUpdate setValue={setValue} errors={errors} isCriticalServiceIdIncluded={isCriticalServiceIdIncluded} onRemoveCriticalService={onRemoveCriticalService} onAddCriticalService={onAddCriticalService} />
      <div style={{ display: 'flex', paddingTop: '30px', justifyContent: 'end' }}>
        <Button onClick={onSubmit}>저장</Button>
      </div>
    </form>
  );
}

export default PetsitterInfoModifyCritical;
