import "bootstrap/dist/css/bootstrap.css";

import buildClient from "../api/build-client";
import Header from "../components/header";
import "../styles/form.css";

const AppComponent = ({ Component, pageProps, user }) => {
  return (
    <div className="bg-dark text-light full-height" style={{ height: "100vh" }}>
      <Header currentUser={user} />
      <div className="container bg-dark">
        <Component currentUser={user} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/current");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.user
    );
  }

  // console.log(pageProps);

  return { pageProps, ...data };
};

export default AppComponent;
