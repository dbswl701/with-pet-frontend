import { z } from 'zod';

export const petsitterInfoResigerSchema = z.object({
  houseImg: z
    .any()
    .refine((file) => file?.length > 0, { message: '집 사진을 업로드해주세요.' }),
  introduction: z
    .string()
    .min(1, { message: '자기소개글을 작성해주세요.' }),
  hashTags: z
    // .string()
    // .min(1, { message: '해시태그를 입력해주세요.' }),
    .array(z.string())
    .min(1, { message: '해시태그를 최소 한 개 이상 입력해주세요.' }),
  withPetService: z
    .array(z.object({
      price: z.number(),
      serviceName: z.string(),
      withPetServiceId: z.number(),
    }))
    .min(1, { message: '서비스를 최소 한 개 이상 등록해주세요.' }),
  criticalService: z
    .array(z.object({
      price: z.number(),
      serviceName: z.string(),
      criticalServiceId: z.number(),
    }))
    .min(1, { message: '필수 서비스를 최소 한 개 이상 등록해주세요.' }),
});

export default petsitterInfoResigerSchema;
