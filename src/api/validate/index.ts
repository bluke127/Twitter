export const isEmail = (asValue: string): boolean => {
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue);
};

export const isPass = (asValue: string): boolean => {
  const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  return regExp.test(asValue);
};
export const isPhone = (asValue: string): boolean => {
  const regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;

  return regExp.test(asValue);
};

export const isId = (asValue: string): boolean => {
  console.log(asValue);
  const regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
  return regExp.test(asValue);
};
