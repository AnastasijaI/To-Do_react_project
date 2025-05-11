import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { db } from "../../../Firebase/Firebase.config";

const EditToDo = ({ isEdit, setIsEdit, updateToDo }) => {
  const [updateValue, setUpdateValue] = useState("");
  useEffect(() => {
    setUpdateValue(updateToDo?.todo || "");
  }, [updateToDo]);

  const handleUpdateToDo = async (event) => {
    event.preventDefault();
    if (updateValue) {
      const updateRef = doc(db, "todos", updateToDo.id);
      await updateDoc(updateRef, { todo: updateValue }).then(() => {
        toast.success("Update ToDo successfully done.");
        setIsEdit(false);
      });
    } else {
      toast.error("put in value inside of field.");
    }
  };

  return (
    <EditToDoContainer className={`${isEdit ? "active" : " "}`}>
      <div className="overlay" onClick={() => setIsEdit(false)}></div>
      <form action="">
        <h2>Edit Your ToDos</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="ToDos"
            id="todoText"
            value={updateValue || ""}
            onChange={(e) => setUpdateValue(e.target.value)}
          />
        </div>
        <div className="input-group">
          <button className="btn" onClick={handleUpdateToDo}>
            Update ToDo
          </button>
        </div>
      </form>
    </EditToDoContainer>
  );
};

const EditToDoContainer = styled.div`
  z-index: 1;
  position: fixed;
  display: grid;
  place-items: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s ease;
  width: 100%;
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    height: 100%;
    z-index: -1;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
    inset: 0;
    opacity: 0;
    transition: all 0.5s ease;
    pointer-events: none;
  }
  &.active .overlay {
    pointer-events: all;
    opacity: 1;
  }
  &.active {
    opacity: 1;
    pointer-events: all;
  }
  &.active form {
    opacity: 1;
    pointer-events: all;
  }
  form {
    width: 450px;
    background-color: var(--secondary-color-alt);
    z-index: 2;
    padding: 2rem;
    color: var(--accent-color);
    opacity: 0;
    transition: all 0.6s ease;
    transition-delay: 0.4s;
    pointer-events: none;
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      color: var(--accent-color);
      margin-bottom: 0.5rem;
      margin: 1rem 0rem;
      input {
        padding: 0.7rem;
        font-size: 1rem;
        font-family: var(--fonts);
        border: none;
        background-color: var(--secondary-color);
        border: 1px solid var(--secondary-color);
        border-radius: 5px;
        margin: 0.2rem 0rem;
        border-radius: 5px;
        outline: none;
        color: var(--accent-color);
      }
    }
  }
  form.active {
    opacity: 1;
    pointer-events: all;
  }
`;

export default EditToDo;
