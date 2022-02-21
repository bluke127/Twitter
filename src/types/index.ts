import * as CSS from 'csstype';
export type popupSet = {
  title: string;
  passage: string;
  confirmMsg: string;
  concelMsg: string;
};

export type styleType = CSS.Properties;
export type eventType = string;
export type btnType = { style?: styleType; class?: string; event: eventType };
