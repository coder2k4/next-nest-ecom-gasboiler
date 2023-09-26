import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {checkUserAuthFX} from "@/app/api/auth";
import {IcheckUserAuthFXResponse} from "@/types/auth";
import {setUser} from "@/context/user";

export const useRedirectByUserCheck = (isAuthPage = false) => {

    const [shouldLoadContent, setShouldLoadContent] = useState(false)
    const router = useRouter()

    const shouldCheckAuth = useRef(true)


    useEffect(() => {

        if (shouldCheckAuth.current) {
            shouldCheckAuth.current = false
            checkUser().then()
        }
    }, [])

    const checkUser = async () => {


        const user: IcheckUserAuthFXResponse | false | undefined = await checkUserAuthFX('/users/login-check')

        if (isAuthPage) {
            if (!user) {
                setShouldLoadContent(true)
                return
            }

            await router.push('/dashboard')
            return
        }

        if (user) {
            setShouldLoadContent(true)
            setUser(user)
            return
        }

        await router.push('/')
    }

    return shouldLoadContent
}