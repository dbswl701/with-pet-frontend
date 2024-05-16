import { z } from 'zod';
import { SignupPageConfig } from '../constants/SignupPage.constans';

// Zod 스키마 정의
export const signUpSchema = z.object({
  email: z
    .string()
    .regex(SignupPageConfig.REGEXP.emailRegex, '이메일 형식에 맞게 입력해주세요.')
    .email('이메일 형식을 입력해주세요.'),
  name: z
    .string()
    .min(3, '3글자 이상 입력해주세요')
    .max(20, '20글자 이하로 입력해주세요')
    .regex(SignupPageConfig.REGEXP.nameRegex, '이름을 입력해주세요'),
  password: z
    .string()
    .min(8, '8자 이상 입력해주세요')
    .max(20, '20자 이하로 입력해주세요')
    .regex(SignupPageConfig.REGEXP.passwordRegex, '영문, 특수문자, 숫자를 포함하여 입력해주세요'),
  passwordCheck: z
    .string()
    .min(8, '8자 이상 입력해주세요')
    .max(20, '20자 이하로 입력해주세요')
    .regex(SignupPageConfig.REGEXP.passwordRegex, '영문, 특수문자, 숫자를 포함하여 입력해주세요'),
  phone: z
    .string()
    .regex(SignupPageConfig.REGEXP.phoneRegex, '알맞은 휴대폰 번호를 입력해주세요'),
  detailAddr: z
    .string()
    .nonempty('상세주소를 입력해주세요'),
  // profile: z.string().url(),
}).refine((data) => data.passwordCheck === data.password, {
  path: ['passwordCheck'],
  message: '비밀번호가 일치하지 않습니다.',
});

export default signUpSchema;
