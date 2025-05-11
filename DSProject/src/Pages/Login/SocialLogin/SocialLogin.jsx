import React, { useEffect } from "react";
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import { auth } from "../../../Firebase/Firebase.config";
import "../Styles/styles.css";
const SocialLogin = () => {
  /* handle Google sign in */
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);

  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);

  useEffect(() => {
    if (googleError || githubError || facebookError) {
      toast.error("Something went wrong by user.");
    }

    if (googleUser || githubUser || facebookUser) {
      toast.success("LoggedIn successfully done.");
    }
  }, [
    googleError,
    githubError,
    facebookError,
    googleUser,
    githubUser,
    facebookUser,
  ]);

  if (googleLoading || githubLoading || facebookLoading) {
    return (
      <p>
        <img
          width={60}
          src="https://www.commpartners.com/wp-content/plugins/wp-meta-seo/assets/images/white-loader.gif"
          alt="loader"
        />
      </p>
    );
  }

  return (
    <div id="socialLogin">
      <p className="line">Or</p>
      <div className="btn-group">
        <button
          type="button"
          onClick={() => signInWithGoogle()}
          className="btn"
        >
          <BsGoogle />
        </button>
        <button
          type="button"
          onClick={() => signInWithGithub()}
          className="btn"
        >
          <BsGithub />
        </button>
        <button
          type="button"
          onClick={() => signInWithFacebook()}
          className="btn"
        >
          <BsFacebook />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
