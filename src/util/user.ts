export const userInfo = {
  checkApi(reg, value) {
    if (!reg.test(value) && value !== "") {
      return "wrong";
    } else if (!reg.test(value) && value === "") {
      return "empty";
    } else {
      return true;
    }
  },
};
