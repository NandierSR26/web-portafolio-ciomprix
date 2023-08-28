export interface IUser {
    id: number;
    name_u: string;
    mail_u: string;
    pass_u: string;
    active_u: number;
    date_create: number;
    date_update: number;
}

export interface IRegisterUserData {
    name_u: string;
    mail_u: string;
    pass_u?: string;
    active_u: number;
}

export interface ILoginData {
    email: string;
    pass: string;
}