import { ChangeEvent } from "react";

export type THandleChangeI = ChangeEvent<HTMLInputElement>;

export type THandleChangeITS = ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
