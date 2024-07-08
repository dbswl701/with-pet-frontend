import React, { useEffect } from 'react';
// import React from 'react';
// import { CancelButton, Button, LabelContainer } from '../../PetsitterInfoManage/PetsitterInfoManage.styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// eslint-disable-next-line import/no-named-as-default
import petsitterInfoResigerSchema from '../../../schemas/petsitterInfoRegister.schemas';

import * as S from '../../PetsitterInfoManage/PetsitterInfoManage.styles';

import { putPetsitterHouseImg } from '../../../services/petsitter';
import HouseUpdate from '../../PetsitterInfoManage/Components/HouseUpdate';

function PetsitterInfoModifyHouse({ houseImgList }) {
  const {
    register, handleSubmit, setValue, formState: { errors }, watch,
  } = useForm({
    resolver: zodResolver(petsitterInfoResigerSchema),
    defaultValues: {
      petSitterHouses: houseImgList,
    },
  });

  useEffect(() => {
    setValue('petSitterHouses', houseImgList);
  }, [setValue, houseImgList]);

  const prevHouseImgList = watch('petSitterHouses');

  const onSubmit = async () => {
    const res = await putPetsitterHouseImg(prevHouseImgList);
    // eslint-disable-next-line no-alert
    alert(res.data.result);
  };
  return (
    <>
      {/* <div style={{ display: 'flex', flexDirection: 'row' }}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <HouseUpdate register={register} errors={errors} setValue={setValue} value={prevHouseImgList} />
        <div style={{ display: 'flex', paddingTop: '30px', justifyContent: 'end' }}>
          <S.Button style={{ width: '100px', height: '40px' }} className="submit" onClick={onSubmit}>저장</S.Button>
        </div>
      </form>
      {/* {
          houseImgList && houseImgList.map((img, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <img
                key={img.petSitterHouseImg}
                src={img.petSitterHouseImg}
                alt="집사진"
                style={{
                  width: '200px', height: '200px', border: index === 0 ? '5px solid rgba(202, 169, 105, .5)' : 'none', borderRadius: '10px', margin: '10px',
                }}
              />
              <CancelButton style={{ marginLeft: '10px' }} type="button" className="cancel" value="X" onClick={() => onRemoveHousImg(img.houseImg)} />
              { index === 0 ? <p>대표사진</p> : <p> </p>}
            </div>
          ))
        } */}
      {/* <S.HouseImgList>
          {
            info.petSitterHouses && info.petSitterHouses.map((img) => (
              <S.HouseImgContainer key={img}>
                <S.HouseImg key={img.petSitterHouseId} src={img.petSitterHouseImg} alt="집사진" isRepresentative={img.petSitterHouseRepresentative} isModify={false} />
              </S.HouseImgContainer>
            ))
          }
        </S.HouseImgList> */}
      {/* <HouseUpdate register={register} errors={errors} setValue={setValue} />

      </div>
      <>
        <input id="file" multiple style={{ visibility: 'hidden' }} type="file" accept="image/*" onChange={handleImageUpload} />
        <S.LabelContainer htmlFor="file">추가</S.LabelContainer>
        <S.Button style={{ width: '100px', height: '40px' }} className="submit" onClick={onSubmit}>저장</S.Button>
      </> */}
    </>
  );
}
export default PetsitterInfoModifyHouse;
