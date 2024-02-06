export interface Question {
    id:          number;
    title:       string;
    body:        string;
    tags:        string[];
    userId:      number;
    username:    string;
    createdDate: Date;
    voteCount:number | null;
    voted:number | string;
    hasApprovedAnswer:boolean;
 
}