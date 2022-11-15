import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchData } from '../api/clientApi';

export default function Search (initialData){
    const router = useRouter();

    return(
        <>
            <Head>
                <title>Search</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>Go <Link href='/'>home</Link></p>
            <h1>Search results for: {router.query.searchTerm}</h1>

            <div className='giphy-search-results-grid'>
            {initialData.gifs.data.map((gif, index) => {
                return (
                <figure key={index}>
                    <figcaption>{gif.title}</figcaption>
                    <img src={gif.images.original.url} alt={gif.title}></img>
                </figure>);
                })}
            </div>
        </>
    );
};

export function getServerSideProps(context) {
    const searchTerm = context.query.searchTerm;
    return new Promise((resolve, reject) => { 
      fetchData(searchTerm).then(data => resolve({ props: { gifs: data }}))
     });
  };