import * as CSS from 'csstype';
export type popupSet = {
  title: string;
  passage: string;
  confirmMsg: string;
  cancelMsg: string;
};

export type styleType = CSS.Properties;
export type eventType = string;
export type knownKeyStringValObj = { [key: string]: string };
export type knownKeyBooleanValObj = { [key: string]: boolean };
export type defaultPopup = {
  confirm: { msg: string };
  cancel: { msg: string };
  body: string;
  top: string;
};
