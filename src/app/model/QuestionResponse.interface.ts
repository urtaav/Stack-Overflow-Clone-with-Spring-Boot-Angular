import { Question } from "./Question.interface";

export interface QuestionResponse {
    questionDTOList: Question[];
    pageNumber:      number;
    pageSize:        number;
    totalElements:   number;
    totalPages:      number;
    lastPage:        boolean;
}
