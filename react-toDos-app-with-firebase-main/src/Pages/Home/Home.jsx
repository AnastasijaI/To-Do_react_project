import { sendEmailVerification } from "firebase/auth";
import React from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { auth } from "../../Firebase/Firebase.config";
import useTitle from "../../Hooks/useTitle";
import CreateTodo from "../Todos/CreateTodo/CreateTodo";
import Todo from "../Todos/Todo/Todo";
const Home = () => {
  useTitle("Home");

  const isUserVerified = auth?.currentUser?.emailVerified;
  /*  verify email  */
  const verifyEmailInHome = () => {
    if (auth?.currentUser?.email === null) {
      return toast.error("Not available email of this credential");
    }
    sendEmailVerification(auth?.currentUser?.email);
    toast.success(
      `we sent you email with verification link on your ${auth?.currentUser?.email}`
    );
  };

  return (
    <HomeContainer>
      <CreateTodo />
      {auth?.currentUser?.providerData[0]?.providerId === "password" &&
      !isUserVerified ? (
        <>
          <div className="err">
            <p>You need to verify yourself to continue</p>
            <button onClick={verifyEmailInHome} className="btn">
              Verify
            </button>
          </div>
        </>
      ) : (
        <Todo />
      )}
    </HomeContainer>
  );
};
const HomeContainer = styled.section`
  position: inherit;
  .err {
    text-align: center;
    color: var(--accent-color);
    font-size: 2rem;
  }
`;
export default Home;
