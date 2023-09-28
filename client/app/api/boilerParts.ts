import {createEffect} from "effector";
import api from "../axiosClient"

export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {

    const {data} = await api.get(url)

    return data
})


export const getBoilerPartsFx = createEffect(async (url: string) => {

    const {data} = await api.get(url)

    return data
})