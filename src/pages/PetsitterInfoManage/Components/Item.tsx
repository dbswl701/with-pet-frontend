import React from "react";
import * as S from "../PetsitterInfoManage.styles";

interface IProps {
  isIncluded: boolean;
  price: number | null;
  serviceImg: string;
  serviceName: string;
  serviceIntroduction: string;
}
function Item({
  isIncluded,
  price,
  serviceImg,
  serviceName,
  serviceIntroduction,
}: IProps) {
  console.log(serviceName, "가격:", price, "isIncluded: ", isIncluded);
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
        <S.ServicePriceInput type="number" value={price || 0} disabled />
      </S.ServicePriceContainer>
    </S.AddedServiceContainer>
  );
}

export default Item;
