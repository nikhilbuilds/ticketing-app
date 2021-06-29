import axios from "axios";
import { useEffect } from "react";
const LandingPage = ({ currentUser }) => {
  console.log("user", currentUser);

  // useEffect(() => {
  //   try {
  //     axios.get("/api/users/current");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  return <h2>LandingPage2: {currentUser?.email}</h2>;
};

LandingPage.getInitialProps = async ({ req }) => {
  //window exists only inside the browser

  console.log(req.headers.cookie);
  if (typeof window === "undefined") {
    //we are on the server
    const res = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current",
      {
        headers: req.headers,
      }
    );
    console.log("===============================hello", res.data);
    return res.data;
  } else {
    //we are on the browser

    const res = await axios.get("/api/users/current");
    return res.data;
  }

  return {};
};

export default LandingPage;
