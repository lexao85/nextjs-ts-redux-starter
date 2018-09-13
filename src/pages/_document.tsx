import fetch from 'isomorphic-unfetch';
import Document, { Head, Main, NextScript } from 'next/document';

import mainScss from '../styles/main.scss';

export default class MyDocument extends Document {
  public static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const res = await fetch('https://localhost:3000/_next/static/sprite/svg-sprite.svg');
    const contents = await res.text();
    initialProps.svgSprite = contents;
    return { ...initialProps };
  }

  public render() {
    return (
      <html lang="en">
        <Head>
          <link rel="manifest" href="/static/manifest.json" />
          <style dangerouslySetInnerHTML={{ __html: mainScss }} />
        </Head>
        <Head key="viewport">
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>
        <Head key="meta_description">
          <meta name="Description" content="Next.js Universal Web App" />
        </Head>
        <body role="main">
          <div dangerouslySetInnerHTML={{ __html: this.props.svgSprite }} />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
