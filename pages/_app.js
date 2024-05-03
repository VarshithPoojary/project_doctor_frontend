import '../styles/globals.css';
import '../styles/slide.scss';
import '../styles/variable.scss';
import '../public/css/bootstrap.css';


function MyApp({ Component, pageProps }) {
  return (
    <>
     
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;