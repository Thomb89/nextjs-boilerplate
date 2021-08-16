import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html className="dark">
        <Head></Head>
        <body className="bg-white dark:bg-gray-800 w-auto h-screen">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
