import type { AppProps } from "next/app";
import "normalize.css";
import "../styles/global.css";
import "@arco-design/web-react/dist/css/arco.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
