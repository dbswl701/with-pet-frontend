/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../PetsitterInfoManage/PetsitterInfoManage.styles';
import WithPetServiceUpdate from '../../PetsitterInfoManage/Components/WithPetServiceUpdate';
import petsitterInfoResigerSchema from '../../../schemas/petsitterInfoRegister.schemas';
import { putPetsitterService } from '../../../services/petsitter';

function PetsitterInfoModifyService({ serviceSelectList, setServiceSelectList, withPetServices }) {
  const {
    handleSubmit, setValue, formState: { errors },
  } = useForm({
    resolver: zodResolver(petsitterInfoResigerSchema),
  });
  const [isServiceIdIncluded, setIsServiceIdIncluded] = useState([]);

  useEffect(() => {
    const includedServices = withPetServices && withPetServices.map((service) => {
      const isIncluded = serviceSelectList.some((sitterService) => sitterService.withPetServiceId === service.withPetServiceId);
      const selected = serviceSelectList.find((sitterService) => sitterService.withPetServiceId === service.withPetServiceId);
      const price = selected ? selected.petSitterWithPetServicePrice : null;
      return { ...service, isIncluded, price };
    });
    setIsServiceIdIncluded(includedServices);
    setValue('petSitterWithPetServices', includedServices);
  }, [serviceSelectList]);

  const onRemoveService = (id) => {
    setServiceSelectList(serviceSelectList.filter((service) => service.withPetServiceId !== id));
  };

  const onAddService = (id, price) => {
    const newServiceList = [...serviceSelectList, { withPetServiceId: id, petSitterWithPetServicePrice: parseInt(price, 10) }];
    setServiceSelectList(newServiceList);
    setValue('petSitterWithPetServices', newServiceList, { shouldValidate: true });
  };

  const onSubmit = async () => {
    const petSitterWithPetServicePrice = serviceSelectList.map((item) => ({
      petSitterWithPetServicePrice: item.petSitterWithPetServicePrice,
      withPetServiceId: item.withPetServiceId,
    }));
    const res = await putPetsitterService(petSitterWithPetServicePrice);
    // eslint-disable-next-line no-alert
    alert(res.data.result);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WithPetServiceUpdate setValue={setValue} errors={errors} isServiceIdIncluded={isServiceIdIncluded} onRemoveService={onRemoveService} onAddService={onAddService} />
      <div style={{ display: 'flex', paddingTop: '30px', justifyContent: 'end' }}>
        <Button onClick={onSubmit}>저장</Button>
      </div>
    </form>
  );
}
export default PetsitterInfoModifyService;
