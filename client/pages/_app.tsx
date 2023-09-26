import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {withHydrate} from "effector-next";
import React, {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import NextNProgress from 'nextjs-progressbar';

const enhance = withHydrate()

function App({Component, pageProps}: AppProps) {

    const [mounted, setMounter] = useState(false)

    useEffect(() => {
        setMounter(true)
    }, [])

    return (
        mounted && (
            <>
                <NextNProgress/>
                {/*<Layout>*/}
                <Component {...pageProps} />
                {/*</Layout>*/}
                <ToastContainer
                    position={'bottom-right'}
                    hideProgressBar={false}
                    closeOnClick
                    rtl={false}
                    limit={1}
                    theme={"light"}
                />
            </>
        )
    )
}


export default enhance(App as React.FC<AppProps>)
