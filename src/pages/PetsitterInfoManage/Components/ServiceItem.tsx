import React, { useState } from "react";
import * as S from "../PetsitterInfoManage.styles";

interface IProps {
  isIncluded: boolean;
  price: number | null;
  serviceImg: string;
  serviceName: string;
  serviceIntroduction: string;
  serviceId: number;
  onRemove: (id: number) => void;
  onAdd: (id: number, price: string) => void;
}

function ServiceItem({
  isIncluded,
  price,
  serviceImg,
  serviceName,
  serviceIntroduction,
  serviceId,
  onRemove,
  onAdd,
}: IProps) {
  const [priceValue, setPriceValue] = useState<string>(price + "" || "");

  // 숫자 입력 시 맨 처음 0 제거
  const handleRemoveZero = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 0으로 시작하는지 확인
    let { value } = e.target;
    if (value.startsWith("0")) {
      value = value.slice(1);
    }
    setPriceValue(value);
  };

  return (
    <S.AddedServiceContainer isIncluded={isIncluded}>
      <S.ServiceInnerContainer>
        <S.ServiceImg src={serviceImg} alt="서비스 이미지" />
        <S.ServiceIntroContainer>
          <S.ServiceTitle>{serviceName}</S.ServiceTitle>
          <S.ServiceIntro>{serviceIntroduction}</S.ServiceIntro>
        </S.ServiceIntroContainer>
      </S.ServiceInnerContainer>
      <S.ServicePriceContainer>
        <S.ServicePriceInput
          type="number"
          value={priceValue}
          disabled={isIncluded}
          onChange={(e) => handleRemoveZero(e)}
        />
        {isIncluded ? (
          <S.ServicePriceBtn
            type="button"
            value="삭제"
            onClick={() => onRemove(serviceId)}
          />
        ) : (
          <S.ServicePriceBtn
            type="button"
            value="추가"
            onClick={() => onAdd(serviceId, priceValue)}
          />
        )}
      </S.ServicePriceContainer>
    </S.AddedServiceContainer>
  );
}

export default ServiceItem;
