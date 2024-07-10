import { z } from "zod";
import { SignupPageConfig } from "../constants/SignupPage.constants";

// Zod 스키마 정의
export type RegisterSchemaType = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .regex(SignupPageConfig.REGEXP.emailRegex, "이메일 형식에 맞게 입력해주세요.")
    .email("이메일 형식을 입력해주세요."),
  password: z
    .string()
    .min(8, "8자 이상 입력해주세요")
    .max(20, "20자 이하로 입력해주세요")
    .regex(SignupPageConfig.REGEXP.passwordRegex, "영문, 특수문자, 숫자를 포함하여 입력해주세요"),
});

export default loginSchema;
