import { z } from 'zod';

export const petsitterInfoResigerSchema = z.object({
  petSitterHouses: z
    .any()
    .refine((file) => file?.length > 0, { message: '집 사진을 업로드해주세요.' }),
  petSitterIntroduction: z
    .string()
    .min(1, { message: '자기소개글을 작성해주세요.' }),
  petSitterHashTags: z
    .array(z.object({
      petSitterHashTagName: z.string(),
    }))
    .min(1, { message: '해시태그를 최소 한 개 이상 입력해주세요.' }),
  petSitterWithPetServices: z
    .array(z.object({
      petSitterWithPetServicePrice: z.number(),
      withPetServiceId: z.number(),
    }))
    .min(1, { message: '서비스를 최소 한 개 이상 등록해주세요.' }),
  petSitterCriticalServices: z
    .array(z.object({
      petSitterCriticalServicePrice: z.number(),
      criticalServiceId: z.number(),
    }))
    .min(1, { message: '필수 서비스를 최소 한 개 이상 등록해주세요.' }),
});

export default petsitterInfoResigerSchema;
