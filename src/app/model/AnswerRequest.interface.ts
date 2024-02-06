export interface AnswerDto {
    id?: number;
    body:       string | null;
    userId:     number | null;
    questionId: number | null;
}