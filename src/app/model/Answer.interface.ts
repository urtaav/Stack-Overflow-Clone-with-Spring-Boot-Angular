import { Comment } from "./Comment.interface";
import { IImage } from "./SingleQuestion.interface";

export interface Answer {
    id: number;
    body: string;
    questionId: number;
    userId: number;
    username: string;
    file: IImage;
    createDate: Date;
    base64: string;
    approved: boolean;
    voted: number  | string;
    voteCount: number;
    commentDtoList: Comment[];
    fileSrc: string;
}