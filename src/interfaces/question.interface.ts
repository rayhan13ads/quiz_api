import { IOption } from "./option.interface";

export interface IQuestion{
    text_question: string;
    is_mandatory: boolean;
    options:IOption[]
}