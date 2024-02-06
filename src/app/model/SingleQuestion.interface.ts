import { Answer } from "./Answer.interface";
import { Question } from "./Question.interface";

export interface SingleQuestion {
    questionDTO:   Question;
    answerDtoList: Answer[];
}



export interface IImage {
    id:   number;
    name: string;
    type: string;
    data: string;
}