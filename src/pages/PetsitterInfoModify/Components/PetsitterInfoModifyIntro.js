import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../PetsitterInfoManage/PetsitterInfoManage.styles';
import IntroUpdate from '../../PetsitterInfoManage/Components/IntroUpdate';
// eslint-disable-next-line import/no-named-as-default
import petsitterInfoResigerSchema from '../../../schemas/petsitterInfoRegister.schemas';
import { putPetsitterIntro } from '../../../services/petsitter';

function PetsitterInfoModifyIntro({ introduction }) {
  const {
    register, handleSubmit, setValue, formState: { errors }, watch, trigger,
  } = useForm({
    resolver: zodResolver(petsitterInfoResigerSchema),
    defaultValues: {
      petSitterIntroduction: introduction,
    },
  });
  const prevIntro = watch('petSitterIntroduction');
  const onSubmit = async () => {
    const res = await putPetsitterIntro(prevIntro);
    // eslint-disable-next-line no-alert
    alert(res.data.result);
  };
  useEffect(() => {
    if (introduction) {
      setValue('petSitterIntroduction', introduction);
    }
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div style={{
        display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', position: 'relative', marginTop: '100px',
      }}
      >
        <IntroUpdate trigger={trigger} register={register} errors={errors} value={prevIntro} />
        <div style={{ display: 'flex', paddingTop: '30px', justifyContent: 'end' }}>
          <Button onClick={onSubmit}>저장</Button>
        </div>
      </div>
    </form>
  );
}

export default PetsitterInfoModifyIntro;
