import { State } from "../App";
import getTodoById from "../utils/getTodoById";
import { useState } from "react";
import axios from "axios";
import { Todo } from "../utils/types";
import url from "../utils/url";

interface Prop {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

// A page in which a todo can be modified. That means either editing an existing todo, or creating a new one.
export default function ModifyTodo({ state, setState }: Prop): JSX.Element {
  const todo = getTodoById(state.todos, state.idRelevantTodo);
  // If idRelevantTodo is > 0, we load in the data so the user can edit it. Otherwise the inputs are blank.
  const titleValue = state.idRelevantTodo === -1 ? "" : todo.title;
  const bodyValue = state.idRelevantTodo === -1 ? "" : todo.body;
  const [inputTitle, setInputTitle] = useState(titleValue);
  const [inputBody, setInputBody] = useState(bodyValue);

  // When user submits, sends either a post or patch request based on whether a todo is being created or edited.
  // then downloads the new data from the server and sends the user back to the homepage.
  function handleSubmit(): void {
    const getNewTodos = async (): Promise<void> => {
      state.idRelevantTodo === -1
        ? await axios.post(url, { title: inputTitle, body: inputBody })
        : await axios.patch(`${url}/${state.idRelevantTodo}`, {
            title: inputTitle,
            body: inputBody,
          });
      const response: Todo[] = await (await axios.get(url)).data;
      setState((state) => {
        const newState = { ...state };
        newState.onHomepage = true;
        newState.todos = response;
        return newState;
      });
    };
    getNewTodos();
  }

  return (
    <div>
      <input
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />
      <input value={inputBody} onChange={(e) => setInputBody(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
