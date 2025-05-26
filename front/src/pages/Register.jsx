import React, { useContext } from "react";
import { Link } from "react-router";
import { userStore } from "../context/UserContext";

function Register() {
  const {registerUser,isLoading}=useContext(userStore)
  function handleRegister(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    registerUser(data)

  }

  return (
    <form
      action=""
      className="min-h-96 flex justify-center items-center"
      onSubmit={handleRegister}
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box m-auto w-xs border p-4">
        <legend className="fieldset-legend">Register</legend>

        <label className="label">Name</label>
        <input type="text" className="input" placeholder="Name" name="name" />

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

        <button className="btn btn-neutral mt-4 " disabled={isLoading?true:false}>register</button>
        <p>
          already have an account <Link to={"/user/login"}>Login</Link>
        </p>
      </fieldset>
    </form>
  );
}

export default Register;
