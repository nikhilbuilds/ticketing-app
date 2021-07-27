import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
export default () => {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });

  const { user, password } = formData;

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      user,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const setInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log(user, password);

    await doRequest();
  };

  return (
    <div>
      {errors}
      <form className="form-signin" onSubmit={onSubmit}>
        {/* <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        /> */}
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" className="sr-only">
          Email address / Phone Number
        </label>
        <input
          value={user}
          name="user"
          onChange={(e) => setInput(e)}
          className="form-control"
        />
        <label for="inputPassword" className="sr-only mt-4">
          Password
        </label>
        <input
          value={password}
          name="password"
          onChange={(e) => setInput(e)}
          type="password"
          className="form-control"
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
      </form>
    </div>
  );
};
