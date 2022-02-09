export type popupSet = {
  title: string;
  passage: string;
  confirmMsg: string;
  concelMsg: string;
};

type btnStyleType = { [key: string]: string | number };
type btnEventType = string;
export type btnType = { style?: btnStyleType; event: btnEventType };
