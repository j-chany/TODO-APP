import Layout from "../components/Layout";
import { UserProvider } from "../context/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </UserProvider>

  );
}

export default MyApp;
