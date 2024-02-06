export interface SignUpRequest {
    name:string;
    email:string;
    password:string;
}

export interface SignupResponse {
    name:string;
    email:string;
    id:number;
}