import React from 'react';
import * as S from '../PetsitterInfoManage.styles';
import Item1 from './Item1';
import Item2 from './Item2';

function WithPetServiceUpdate({ isServiceIdIncluded, onRemoveService, onAddService }) {
  return (
    <div>
      <S.Title>이용 가능 서비스</S.Title>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {isServiceIdIncluded && isServiceIdIncluded.map((service) => (service.isIncluded ? (
          <Item1 key={service.withPetServiceId} service={service} onRemove={onRemoveService} />
        ) : (
          <Item2 key={service.withPetServiceId} service={service} onAdd={onAddService} />
        )))}
      </div>
    </div>
  );
}

export default WithPetServiceUpdate;
