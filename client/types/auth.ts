import {FieldErrors, UseFormRegister} from "react-hook-form";

export interface  IInputs {
    name: string;
    password: string;
    email: string
}

export interface IAuthPageInput {
    errors: FieldErrors<IInputs>,
    register: UseFormRegister<IInputs>
}


export interface ISignUpFX {
    url: string;
    username: string;
    password: string;
    email: string
}

export interface ISignInFx {
    url: string;
    username: string;
    password: string;
}

export interface ISignInFx {
    url: string;
    username: string;
    password: string;
}


export interface IcheckUserAuthFXResponse {
    userId: number | string,
    username: string
    email: string
}