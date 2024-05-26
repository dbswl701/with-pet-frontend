import React from 'react';
import * as S from '../PetsitterInfoManage.styles';
import Item1 from './Item1';
import Item2 from './Item2';

function CriticalServiceUpdate({ isCriticalServiceIdIncluded, onRemoveCriticalService, onAddCriticalService }) {
  return (
    <div>
      <S.Title>필수 서비스</S.Title>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {isCriticalServiceIdIncluded && isCriticalServiceIdIncluded.map((service) => (service.isIncluded ? (
          <Item1 key={service.criticalServiceId} service={service} onRemove={onRemoveCriticalService} />
        ) : (
          <Item2 key={service.criticalServiceId} service={service} onAdd={onAddCriticalService} />
        )))}
      </div>
    </div>
  );
}

export default CriticalServiceUpdate;
