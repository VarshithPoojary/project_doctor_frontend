import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
class MyDocument extends Document {

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel="manifest" href="manifest.json" />
          <link rel="shortcut icon" href="/icons/logo.png" />
          <link rel="icon" type="image/png" sizes="20x20" href="/logo.png" />
      
          <link href="assets/libs/custombox/custombox.min.css" type="text/css" />

          {/* <title>M2BHEALTH</title> */}
          <meta property="og:image" content="/icons/logo.png" />

          {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" /> */}

          <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
          <link href="/css/icons.min.css" rel="stylesheet" type="text/css" />
          <link href="/css/app.css" rel="stylesheet" type="text/css" />
          <link href="/css/react-bootstrap-table.css" rel="stylesheet" type="text/css" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/metisMenu/3.0.3/metisMenu.css" rel="stylesheet" type="text/css" />
          <link href="/libs/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />

          <link href="/plugins/bootstrap-fileupload/bootstrap-fileupload.css" rel="stylesheet" />
          <link rel="stylesheet" href="/css/select2/select2.min.css" />
          <link href="/plugins/bootstrap-fileupload/bootstrap-fileupload.css" rel="stylesheet" />

          
          

          
        </Head>
        <body>


          <Main />
          <NextScript />
          
          <Script src="/js/select2/select2.min.js"></Script>
          <Script src="/js/app.min.js"></Script>
          <Script src="/js/jquery.min.js"></Script>
          <Script src="/js/metisMenu.js"></Script>
          <Script src="/js/waves.js"></Script>
          <Script src="/js/popper.min.js"></Script>
          <Script src="/js/bootstrap.min.js"></Script>
          {/* <script src="/static/js/waves.js"></script> */}
          <Script src="/js/jquery.slimscroll.js"></Script>
          <Script src="/js/select2/select2.min.js"></Script>
          <Script src="/pages/jquery.dashboard.init.js"></Script>
          
          {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js"></Script> */}

          {/* <Script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></Script> */}
          <script src="/js/app.js"></script>
          {/* <script src="/static/js/app.js"></script> */}
          <Script src="https://canvasjs.com/assets/script/canvasjs.min.js"> </Script>

          {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/metisMenu/3.0.7/metisMenu.min.js"></Script> */}
          {/* 
        <script src="/static/libs/tablesaw/tablesaw.js"></script>

        <script src="/static/js/pages/tablesaw.init.js"></script> */}



        </body>
      </Html>
    )
  }
}

export default MyDocument