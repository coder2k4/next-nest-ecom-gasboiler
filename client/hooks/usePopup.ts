import {useEffect, useState} from "react";

export const usePopup = () => {

    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        window.scrollTo(0,0)
        document.querySelector('.overlay')?.classList.add('open')
        document.querySelector('.body')?.classList.add('overlay-hidden')
        setOpen(true)
    }

    const closePopup = () => {
        window.scrollTo(0,0)
        document.querySelector('.overlay')?.classList.remove('open')
        document.querySelector('.body')?.classList.remove('overlay-hidden')
        setOpen(false)
    }

    useEffect(()=>{
        const overlay = document.querySelector('.overlay')
        overlay?.addEventListener('click', closePopup)

        return () => {
            overlay?.removeEventListener('click', closePopup)
        }

    }, [open])


    return { open, toggleOpen, closePopup }

}