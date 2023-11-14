import {createDomain} from "effector-next";

const header = createDomain()

export const setSearchInputZIndex = header.createEvent<number | string>()

export const $searchInputZIndex = header
    .createStore<number | string>(1)
    .on(setSearchInputZIndex, (_, zIndex) => zIndex)