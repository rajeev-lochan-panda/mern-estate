import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "sonner";
import { IErrorState, IFormData } from "../types/user";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../redux/features/user/userSlice";
import { RootState } from "../redux/store";
import OAuth from "../components/OAuth";

function Signin() {
  //#region variables
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //stores form data state
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

  //stores error messages state
  const [errorMessage, setErrorMessage] = useState<IErrorState>({
    email: "",
    password: "",
    form: "",
  });

  const {loading} = useSelector((state: RootState) => state.user);
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
    setErrorMessage({ ...errorMessage, [id]: validateField(id, value) });
  };

  //handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      form: "",
    };

    if (newError.email || newError.password) {
      setErrorMessage(newError);
      return;
    }

    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch(`${BASE_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setErrorMessage({ ...errorMessage, form: data.message });
        dispatch(signInFailure(data.message));
        toast.error(data.message);
        return;
      }

      setErrorMessage({ email: "", password: "", form: "" });
      setFormData({ email: "", password: "" });
      dispatch(signInSuccess(data));
      toast.success(data.message);
      navigate("/home");
    } catch (err: any) {
      setErrorMessage({ ...errorMessage, form: err.message });
      dispatch(signInFailure(err.message));
      toast.error(err.message);
    }
  };

  //#endregion

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>
      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="boerder p-3 rounded-lg focus:outline-slate-300"
          value={formData.email}
          onChange={(e) => handleChange(e)}
        />
        {errorMessage.email && <p className="text-red-500">{errorMessage.email}</p>}

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="boerder p-3 rounded-lg focus:outline-slate-300"
          value={formData.password}
          onChange={(e) => handleChange(e)}
        />
        {errorMessage.password && <p className="text-red-500">{errorMessage.password}</p>}

        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Do not have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
