import {useEffect, useState} from "react";
import {getWindowWidth} from "@/utils/common";

const useWindowWidths = () => {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth())

    const handleResize = () => {
        setWindowWidth(getWindowWidth())
    }

    useEffect(()=>{
        window.addEventListener('resize', handleResize, true)

        return window.removeEventListener('resize', handleResize, true)
    }, [])


    return {windowWidth, handleResize}
}


export const useMediaQuery = (maxWidth: number) => {
    const {
        windowWidth: {windowWidth},
        handleResize,
    } = useWindowWidths()

    const [isMedia, setIsMedia] = useState(false)


    useEffect(()=>{

        if(windowWidth <= maxWidth) {
            setIsMedia(true)
        }
        else {
            setIsMedia(false)
        }

    }, [handleResize, maxWidth, windowWidth])

    return isMedia
}