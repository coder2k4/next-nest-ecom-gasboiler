import Head from "next/head";
import {useRedirectByUserCheck} from "@/hooks/useRedirectByUserCheck";
import {useStore} from "effector-react";
import {$boilerPart, setBoilerPart} from "@/context/boilerPart";
import {useCallback, useEffect, useState} from "react";
import Layout from "@/components/layout/Layout";
import {IQueryParams} from "@/types/catalog";
import {getBoilerPartFx} from "@/app/api/boilerParts";
import {toast} from 'react-toastify'
import {useRouter} from "next/router";
import Custom404 from "@/pages/404";
import {PartPage} from "@/components/templates/PartPage/PartPage";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";

const CatalogPartPage = ({query}: { query: IQueryParams }) => {


    const [error, setError] = useState(false)
    const router = useRouter()
    const shouldLoadContent = useRedirectByUserCheck()
    const boilerPart = useStore($boilerPart)

    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    const getDefaultTextGenerator = useCallback(
        (subpath: string) => {
            return subpath.replace('catalog', 'Каталог')
        },
        []
    )
    /*
    const getTextGenerator = useCallback((param: string, query: any) => {
        return {
            "partId": async () => (await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)).name,
        } [param]
    }, [])
    */

    const getTextGenerator = useCallback((param: string, query: any) => ({}[param]), [])


    useEffect(() => {
        loadBoilerPart()
    }, [router.asPath]);

    useEffect(() => {
        if (lastCrumb) {
            lastCrumb.textContent = boilerPart.name
        }
    }, [boilerPart, lastCrumb]);


    const loadBoilerPart = async () => {

        try {
            const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)

            if (!data) {
                setError(true)
                return
            }
            setBoilerPart(data)


        } catch (e) {
            toast.error((e as Error).message)
        }

    }

    return (
        <>
            <Head>
                <title>Аква Тепмикс | {shouldLoadContent ? boilerPart.name : ''}</title>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg"/>
            </Head>
            {error ? (
                <Custom404/>
            ) : (
                shouldLoadContent && (
                    <Layout>
                        <main>

                            {
                                <Breadcrumbs
                                    getDefaultTextGenerator={getDefaultTextGenerator}
                                    getTextGenerator={getTextGenerator}
                                />
                            }
                            <PartPage/>
                            <div className="overlay"/>
                        </main>
                    </Layout>
                )
            )}
        </>
    );
};


export async function getServerSideProps(context: { query: IQueryParams }) {
    return {
        props: {query: {...context.query}},
    }
}


export default CatalogPartPage