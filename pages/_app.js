import Nav from "../components/Navbar/Nav";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
