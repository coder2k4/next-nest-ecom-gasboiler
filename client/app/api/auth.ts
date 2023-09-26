import {createEffect} from "effector";
import {IcheckUserAuthFXResponse, ISignInFx, ISignUpFX} from "@/types/auth";
import {toast} from "react-toastify";
import api from "@/app/axiosClient";
import {AxiosError} from "axios";
import {HTTPStatus} from "@/constans";

export const signUpFx = createEffect(async (
    {url, password, email, username}: ISignUpFX
) => {

    const {data} = await api.post(url, {username, password, email})

    if (data.warningMessage) {
        toast.warning(data.warningMessage)
        return
    }

    toast.success('Регистрация прощла успешно!')

    return data
})


export const singInFx = createEffect(async (
    {url, username, password}: ISignInFx
) => {

    const {data} = await api.post(url, {username, password})
    toast.success('Вход выполнен!')
    return data

})


export const checkUserAuthFX = createEffect(async (
    url: string
): Promise<IcheckUserAuthFXResponse | false | undefined> => {

    try {
        const {data} = await api.get(url)
        return data
    } catch (e) {
        const axiosError = e as AxiosError

        if (axiosError.response) {
            if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
                return false
            }
        }

        toast.error((e as Error).message)
    }

})


export const logoutFx = createEffect(async (url: string) => {
    try {
        await api.get(url)
        toast.success('Вы успешно вышли.')

    } catch (e) {

        const axiosError = e as AxiosError

        if (axiosError.response) {
            if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
                return false
            }
        }

        toast.error((e as Error).message)
    }
})