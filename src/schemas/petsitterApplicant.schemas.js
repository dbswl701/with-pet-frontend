import { z } from 'zod';

export const petsitterApplicantSchema = z.object({
  animalCareer: z
    .string()
    .nonempty('반려 동물 관련 경력 또는 경험에 대해서 알려주세요'),
  birth: z
    .string('생년월일을 입력해주세요.')
    .length(10, '10자리를 입력해주세요.')
    .nonempty(),
  gender: z
    .string({
      invalid_type_error: '성별을 선택해주세요.',
    }),
  havingWithPet: z
    .string({
      invalid_type_error: '강아지 반려 경험 유무를 선택해주세요.',
    }),
  isSmoking: z
    .string({
      invalid_type_error: '흡연 여부를 선택해주세요.',
    }),
  // licenseImg: z
  //   .nonempty('자격증을 첨부해주세요.'),
  motivation: z
    .string()
    .nonempty('지원 동기에 대해 작성해주세요.'),
});

export default petsitterApplicantSchema;
