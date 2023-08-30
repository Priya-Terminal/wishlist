import Document, { Head, Html, Main, NextScript } from "next/document";
import Layout from "../components/layout/Layout";

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Layout> 
            <Main />
          </Layout>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
