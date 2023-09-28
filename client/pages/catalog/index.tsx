import Head from "next/head";
import Layout from "@/components/layout/Layout";
import {useRedirectByUserCheck} from "@/hooks/useRedirectByUserCheck";
import CatalogPage from "@/components/templates/CatalogPage/CatalogPage";
import {IQueryParams} from "@/types/catalog";

const Dashboard = ({query}: { query: IQueryParams }) => {

    const shouldLoadContent = useRedirectByUserCheck()

    const getDefaultTextGenerator = () => ''
    const getTextGenerator = () => ''

    return (
        <>
            <Head>
                <title>Аква Тепмикс | {shouldLoadContent ? 'Каталог' : ''}</title>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg"/>
            </Head>

            {shouldLoadContent && (
                <Layout>
                    <main>
                        <CatalogPage
                            query={query}
                        />
                        {/*    getDefaultTextGenerator={getDefaultTextGenerator}*/}
                        {/*    getTextGenerator={getTextGenerator}*/}
                        {/*/>*/}

                        <div className="overlay"/>
                    </main>
                </Layout>
            )}
        </>
    );
};


export async function getServerSideProps(context: { query: IQueryParams }) {
    return {
        props: {
            query: {
                ...context.query
            }
        }
    }
}

export default Dashboard
