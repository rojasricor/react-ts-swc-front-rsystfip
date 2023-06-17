import { ChangeEvent } from "react";

export type handleChangeQD = ChangeEvent<
  (HTMLInputElement | HTMLTextAreaElement) | HTMLSelectElement
>;
