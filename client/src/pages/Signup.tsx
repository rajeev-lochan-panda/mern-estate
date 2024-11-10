import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "sonner";
import OAuth from "../components/OAuth";

function Signup() {
  //#region variables
  const navigate = useNavigate();

  //stores form data state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  //stores error messages state
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    form: "",
  });

  //stores loading state
  const [loading, setLoading] = useState(false);
  //#endregion

  //#region functions

  //handles email validations
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  //handles field validations
  const validateField = (id: string, value: string) => {
    let message = "";
    if (!value) {
      message = `${id.charAt(0).toUpperCase() + id.slice(1)} is required.`;
    } else if (id === "email" && !validateEmail(value)) {
      message = "Please enter a valid email address.";
    }
    return message;
  };

  //handles input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError({ ...error, [id]: validateField(id, value) });
  };

  //handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = {
      username: validateField("username", formData.username),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      form: "",
    };

    if (newError.username || newError.email || newError.password) {
      setError(newError);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError({ ...error, form: data.message });
        toast.error(data.message);
        return;
      }

      setError({ username: "", email: "", password: "", form: "" });
      setFormData({ username: "", email: "", password: "" });
      setLoading(false);
      toast.success(data.message);
      navigate("/sign-in");
    } catch (err: any) {
      setLoading(false);
      setError({ ...error, form: err.message });
      toast.error(err.message);
    }
  };

  //#endregion

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="User Name"
          className="boerder p-3 rounded-lg focus:outline-slate-300"
          value={formData.username}
          onChange={(e) => handleChange(e)}
        />
        {error.username && <p className="text-red-500">{error.username}</p>}

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="boerder p-3 rounded-lg focus:outline-slate-300"
          value={formData.email}
          onChange={(e) => handleChange(e)}
        />
        {error.email && <p className="text-red-500">{error.email}</p>}

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="boerder p-3 rounded-lg focus:outline-slate-300"
          value={formData.password}
          onChange={(e) => handleChange(e)}
        />
        {error.password && <p className="text-red-500">{error.password}</p>}

        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
