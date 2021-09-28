import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html className="dark">
        <Head></Head>
        <body className="bg-gray-200 dark:bg-gray-900 w-auto h-screen">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
