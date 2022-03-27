// export const userInfo = {
//   checkApi(reg:string, value) {
//     if (!reg.test(value) && value !== '') {
//       return 'wrong';
//     } else if (!reg.test(value) && value === '') {
//       return 'empty';
//     } else {
//       return true;
//     }
//   },
// };
export const transformDateMethod = (date: Date) => {
  if (!date) return;
  const d = new Date(date);
  let year;
  let month;
  let day;
  (month = '' + (d.getMonth() + 1)),
    (day = '' + d.getDate()),
    (year = d.getFullYear());
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return `${year}년 ${month}월 ${day}일`;
};
