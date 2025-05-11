import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiCheckDouble } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";
import { db } from "../../../Firebase/Firebase.config";
import useTodos from "../../../Hooks/useTodos";
import EditToDo from "../EditToDo/EditToDo";
const Todo = () => {
  const { toDos, loading } = useTodos();
  const [isEdit, setIsEdit] = useState(false);
  const [updateToDo, setUpdateToDo] = useState("");
  /* handle remove toDos */
  const handleRemoveToDo = async (id) => {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef)
      .then(() => {
        toast.success(`${id} toDos deleted successfully done.`);
      })
      .catch((err) => toast.error(err.message.split(":")[1]));
  };

  /* handle edit toDos */

  const handleEditToDos = (id) => {
    setIsEdit(true);
    const findToDos = toDos.find((todo) => todo.id === id);
    setUpdateToDo({ todo: findToDos.todo, id: findToDos.id });
  };

  return (
    <>
      <EditToDo isEdit={isEdit} setIsEdit={setIsEdit} updateToDo={updateToDo} />
      <TodoContainer>
        <div className="container">
          {toDos.length > 0 ? (
            !loading ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ToDo</th>
                    <th style={{ width: "100px" }}>Action</th>
                    <th style={{ width: "100px" }}>Edit</th>
                    <th style={{ width: "100px" }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {toDos.map((todo, ind) => (
                    <tr key={todo.id}>
                      <td title={todo.id}>
                        {Number(ind + 1) + " - " + todo.id.slice(0, 3)}
                      </td>
                      <td>{todo.todo}</td>
                      <td>
                        <span className="cursor-pointer check">
                          <BiCheckDouble />
                        </span>
                      </td>
                      <td>
                        <span
                          onClick={() => handleEditToDos(todo.id)}
                          className="cursor-pointer"
                        >
                          <FiEdit />
                        </span>
                      </td>
                      <td>
                        <span
                          className="cursor-pointer"
                          onClick={() => handleRemoveToDo(todo.id)}
                        >
                          <BsTrash />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              "loading..."
            )
          ) : (
            "No toDos Yet."
          )}
        </div>
      </TodoContainer>
    </>
  );
};

const TodoContainer = styled.div`
  position: relative;
  color: var(--accent-color);

  .check {
    font-size: 2rem;
    color: #07e530ec;
  }
`;

export default Todo;
