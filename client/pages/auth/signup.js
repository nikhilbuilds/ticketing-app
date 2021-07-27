import { useState } from "react";
import { axios } from "axios";
import useRequest from "../../hooks/use-request";
import { useRouter } from "next/router";
// interface SignUpForm = {
//     email: string,
//     phone: string,
//     password: string
// }

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const { email, phone, password } = formData;
  const router = useRouter();

  const { doRequest, errors, onSuccess } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      phone,
      email,
      password,
    },

    onSuccess: () => router.push("/"),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };

  const setInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="form-signin" onSubmit={onSubmit}>
      {/* <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        /> */}
      <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
      <label for="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        value={email}
        name="email"
        onChange={(e) => setInput(e)}
        className="form-control"
      />
      <label for="inputPassword" className="sr-only mt-4">
        Phone
      </label>
      <input
        value={phone}
        name="phone"
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
        Sign up
      </button>

      {errors}
    </form>
  );
}
