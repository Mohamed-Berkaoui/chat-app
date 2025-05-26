import React, { useContext } from "react";
import { Link } from "react-router";
import { userStore } from "../context/UserContext";

function Login() {
  const { loginUser, isLoading } = useContext(userStore);
  function handleSubmit(e){
    e.preventDefault()
      const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    loginUser(data)
  }
  return (
    <form action="" className="min-h-96 flex justify-center items-center" onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box m-auto w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          name="email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          name="password"
        />

        <button className="btn btn-neutral mt-4" disabled={isLoading?true:false}>Login</button>
        <p>
          register now from <Link to={"/user/register"}>here</Link>
        </p>
      </fieldset>
    </form>
  );
}

export default Login;
