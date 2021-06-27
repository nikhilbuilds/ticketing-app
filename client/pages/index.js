import axios from "axios";
import { useEffect } from "react";
const LandingPage = ({ user }) => {
  console.log("user", user);

  // useEffect(() => {
  //   try {
  //     axios.get("/api/users/current");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  return <h2>LandingPage2</h2>;
};

LandingPage.getInitalProps = async () => {
  try {
    const res = await axios.get("/api/users/current");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default LandingPage;
