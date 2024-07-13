import React from 'react';
import * as S from '../PetsitterInfoManage.styles';
import ServiceItem from './ServiceItem';

function CriticalServiceUpdate({
  errors, isCriticalServiceIdIncluded, onRemoveCriticalService, onAddCriticalService,
}) {
  return (
    <div>
      <S.Title>필수 서비스</S.Title>
      <S.ServiceList>
        {
          isCriticalServiceIdIncluded && isCriticalServiceIdIncluded.map((service) => (
            <ServiceItem key={service.criticalServiceId} price={service.price} isIncluded={service.isIncluded} serviceImg={service.criticalServiceImg} serviceName={service.criticalServiceName} serviceIntroduction={service.criticalServiceIntroduction} serviceId={service.criticalServiceId} onRemove={onRemoveCriticalService} onAdd={onAddCriticalService} />
          ))
        }
      </S.ServiceList>
      {
        errors.petSitterCriticalServices && <S.ErrorMsg>{errors.petSitterCriticalServices.message}</S.ErrorMsg>
      }
    </div>
  );
}

export default CriticalServiceUpdate;
