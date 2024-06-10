import React from 'react';
import * as S from '../PetsitterInfoManage.styles';
import ServiceItem from './ServiceItem';

function WithPetServiceUpdate({ isServiceIdIncluded, onRemoveService, onAddService }) {
  return (
    <div>
      <S.Title>이용 가능 서비스</S.Title>
      <S.ServiceList>
        {
          isServiceIdIncluded && isServiceIdIncluded.map((service) => (
            <ServiceItem key={service.withPetServiceId} isIncluded={service.isIncluded} serviceImg={service.withPetServiceImg} serviceName={service.withPetServiceName} serviceIntroduction={service.withPetServiceIntroduction} serviceId={service.withPetServiceId} onRemove={onRemoveService} onAdd={onAddService} />
          ))
        }
      </S.ServiceList>
    </div>
  );
}

export default WithPetServiceUpdate;
