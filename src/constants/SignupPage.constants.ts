export const SignupPageConfig = {
  REGEXP: {
    emailRegex: /^[a-z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/i,
    nameRegex: /^[ㄱ-ㅎ가-힣a-z0-9_-]+$/,
    passwordRegex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/,
    phoneRegex: /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/,
  },
};

export default SignupPageConfig;
