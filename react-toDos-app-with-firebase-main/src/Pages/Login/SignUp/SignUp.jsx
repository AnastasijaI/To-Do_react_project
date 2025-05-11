import React, { useContext, useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import { auth } from "../../../Firebase/Firebase.config";
import SocialLogin from "../SocialLogin/SocialLogin";
import "../Styles/styles.css";
const SignUp = () => {
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);

  /* handle create user  */
  const handleCreateUser = async (event) => {
    event.preventDefault();

    if (!formInput.name) return toast.error("Name field is required.");
    if (!formInput.email) return toast.error("Email field is required.");
    if (!formInput.password) return toast.error("Password field is required.");
    if (!formInput.confirmPassword)
      return toast.error("Confirm Password field is required.");
    if (formInput.password !== formInput.confirmPassword)
      return toast.error("Password didn't match somehow");
    await createUserWithEmailAndPassword(formInput.email, formInput.password);
    await updateProfile({
      displayName: formInput.name,
      photoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTiXjldHhFIVdvZDCeoq6sSzSzxg95OvLCxQ&usqp=CAU",
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message.split(":")[1]);
    }
    if (user) {
      toast.success("User created successfully done.");
      navigate("/home");
    }
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate, error, user]);

  return (
    <section className="signUp-container">
      <div className="form-wrapper">
        <h1>
          Sign Up into <span className="colorize">Account</span>
        </h1>
        <form action="" onSubmit={handleCreateUser}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onBlur={(e) =>
                setFormInput({ ...formInput, name: e.target.value })
              }
              id="name"
              placeholder="Name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onBlur={(e) =>
                setFormInput({ ...formInput, email: e.target.value })
              }
              id="email"
              placeholder="Email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onBlur={(e) =>
                setFormInput({ ...formInput, password: e.target.value })
              }
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="cmfPassword">Confirm Password</label>
            <input
              type="password"
              onBlur={(e) =>
                setFormInput({ ...formInput, confirmPassword: e.target.value })
              }
              id="cmfPassword"
              placeholder="Confirm Password"
            />
          </div>

          <div className="input-group">
            <button type="submit" className="btn">
              {loading ? "Creating...." : "Sign Up"}
            </button>
          </div>
          <SocialLogin />
          <p>
            Already have an Account?
            <span
              className="colorize cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
