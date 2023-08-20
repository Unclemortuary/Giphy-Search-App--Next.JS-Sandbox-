import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchData } from '../api/clientApi';
import Footer from '../components/Footer';

export default function Search (initialData){
    const router = useRouter();

    return(
        <>
            <Head>
                <title>Search results for: {router.query.searchTerm}</title>
                <meta name='description' content={initialData.gifs.data.map((each, index) => each.title + ' ')}/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>Go <Link href='/'>home</Link></p>
            <h1>Search results for: {router.query.searchTerm}</h1>

            <div className='giphy-search-results-grid'>
            {initialData.gifs.data.map((gif, index) => {
                return (
                <figure key={index}>
                    <figcaption>{gif.title}</figcaption>
                    <Image
                        src={gif.images.original.url}
                        alt={gif.title}
                        width='550'
                        height='333'
                        loading='lazy'
                    />
                </figure>);
                })}
            </div>
            <Footer/>
        </>
    );
};

export function getServerSideProps(context) {
    const searchTerm = context.query.searchTerm;
    return new Promise((resolve, reject) => { 
      fetchData(searchTerm).then(data => resolve({ props: { gifs: data }}))
    });
};