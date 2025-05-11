import React, { useContext, useEffect, useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import { auth } from "../../../Firebase/Firebase.config";
import useTitle from "../../../Hooks/useTitle";
import SocialLogin from "../SocialLogin/SocialLogin";
import "../Styles/styles.css";
const Login = () => {
  useTitle("Login");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate]);

  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const [reset, setReset] = useState(false);

  /* handle login form */

  const handleLoginForm = (event) => {
    event.preventDefault();
    if (!inputLogin.email) return toast.error("Email field is required.");
    if (!reset) {
      if (!inputLogin.password)
        return toast.error("Password field is required.");
    }
    signInWithEmailAndPassword(inputLogin.email, inputLogin.password);
  };

  /*  handle reset password  */
  const handleResetPassword = () => {
    if (!inputLogin.email) return toast.error("Email is required for reset.");
    sendPasswordResetEmail(inputLogin.email);
    toast.success(`We sent password reset email on your ${inputLogin.email}`);
  };

  useEffect(() => {
    if (user) {
      toast.success("Logged In successfully done.");
      navigate("/home");
    }
    if (error) {
      toast.error(error.message.split(":")[1]);
    }
  }, [user, error, navigate]);

  return (
    <section className="login-container">
      <div className="form-wrapper">
        {reset ? (
          <h1>
            Reset <span className="colorize">Password</span>
          </h1>
        ) : (
          <h1>
            Sign In into <span className="colorize">Account</span>
          </h1>
        )}
        <form action="" onSubmit={handleLoginForm}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onBlur={(e) =>
                setInputLogin({ ...inputLogin, email: e.target.value })
              }
              placeholder="Email"
            />
          </div>
          {!reset && (
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onBlur={(e) =>
                  setInputLogin({ ...inputLogin, password: e.target.value })
                }
                id="password"
                placeholder="Password"
              />
            </div>
          )}
          {reset ? (
            <p>
              Go to
              <span
                className="colorize cursor-pointer"
                onClick={() => setReset((prev) => !prev)}
              >
                {" "}
                home
              </span>
            </p>
          ) : (
            <p>
              Forget Password?
              <span
                className="colorize cursor-pointer"
                onClick={() => setReset((prev) => !prev)}
              >
                {" "}
                Reset
              </span>
            </p>
          )}

          <div className="input-group">
            {reset ? (
              <button
                type="button"
                onClick={handleResetPassword}
                className="btn"
              >
                Reset Password
              </button>
            ) : (
              <button type="submit" className="btn">
                {loading ? "Sign inning..." : "Sign In"}
              </button>
            )}
          </div>
          {!reset && <SocialLogin />}
          <p>
            Not yet Account?
            <span
              onClick={() => navigate("/sign-up")}
              className="colorize cursor-pointer"
            >
              {" "}
              Create
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
