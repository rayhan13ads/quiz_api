import { IQuestion } from "./question.interface";

export interface IQuiz {
    title:string,
    description: string;
    is_publish: boolean;
    questions: IQuestion[];
}