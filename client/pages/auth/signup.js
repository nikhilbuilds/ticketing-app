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
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          name="email"
          onChange={(e) => setInput(e)}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          value={phone}
          name="phone"
          onChange={(e) => setInput(e)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          name="password"
          onChange={(e) => setInput(e)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
