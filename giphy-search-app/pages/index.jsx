import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchData } from './api/clientApi';
import Image from 'next/image';
import Footer from './components/Footer';

export default function Home(initialData) {
  const [formInput, setFormInput] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('nature');

  useEffect(() => {
    setSearchResult(initialData.gifs.data);
  }, [initialData]);

  useEffect(() => {
    fetchData(formInput).then(response => setSearchResult(response.data));
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setFormInput(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();
    setSearchTerm(formInput);
  };

  return (
    <>
        <div >
          <Head>
            <title>Giphy search app</title>
            <meta name="description" content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <h1>Giphy search app</h1>
          <div>
            <Image
              src='/vercel.svg'
              alt='logo'
              width={50}
              height={100}
            />
          </div>

          <form onSubmit={search}>
            <input name='searchTerm' type='text' onChange={handleInputChange}/>
            <input type='submit' value='Search'/>
          </form>

          <h2>Search results for: {searchTerm}</h2>

          <p> Share this search 
            <Link 
              href="/search/[pid]" 
              as={`/search/${searchTerm}`}>
                https://localhost:3000/search/{searchTerm}
            </Link>
          </p>

          <div className='giphy-search-results-grid'>
          {searchResult && searchResult.map((gif, index) => {
              return (
              <figure key={index}>
                <figcaption>{gif.title}</figcaption>
                <Image
                  src={gif.images.original.url} 
                  alt={gif.title}
                  width='550'
                  height='333'
                  loading='lazy'/>
              </figure>);
            })}
          </div>
        </div>
        <Footer/>
    </>
  );
};

export function getStaticProps() {
  return new Promise((resolve, reject) => { 
    fetchData().then(data => resolve({ props: { gifs: data }}))
  });
};