import React from 'react';
import * as S from '../PetsitterInfoManage.styles';
import NotAddedService from './NotAddedService';
import AddedService from './AddedService';

function WithPetServiceUpdate({ isServiceIdIncluded, onRemoveService, onAddService }) {
  console.log('isServiceIdIncluded:', isServiceIdIncluded);
  return (
    <div>
      <S.Title>이용 가능 서비스</S.Title>
      <S.ServiceList>
        {isServiceIdIncluded && isServiceIdIncluded.map((service) => (service.isIncluded ? (
          <AddedService key={service.withPetServiceId} isIncluded={service.isIncluded} serviceImg={service.withPetServiceImg} serviceName={service.withPetServiceName} serviceIntroduction={service.withPetServiceIntroduction} price={service.price} serviceId={service.withPetServiceId} onRemove={onRemoveService} />
        ) : (
          <NotAddedService key={service.withPetServiceId} isIncluded={service.isIncluded} serviceImg={service.withPetServiceImg} serviceName={service.withPetServiceName} serviceIntroduction={service.withPetServiceIntroduction} price={service.price} serviceId={service.withPetServiceId} onAdd={onAddService} />
        )))}
      </S.ServiceList>
    </div>
  );
}

export default WithPetServiceUpdate;
