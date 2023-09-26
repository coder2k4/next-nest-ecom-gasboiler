import {createDomain} from "effector-next";
import {IcheckUserAuthFXResponse} from "@/types/auth";


const user = createDomain()
export const setUser = user.createEvent<IcheckUserAuthFXResponse>()
export const $user =
    user.createStore<IcheckUserAuthFXResponse>({} as IcheckUserAuthFXResponse)
        .on(setUser, (_, user) => user)