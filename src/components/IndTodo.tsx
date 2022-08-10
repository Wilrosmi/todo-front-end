import { Todo } from "../utils/types";
import { State } from "../App";
import axios from "axios";
import url from "../utils/url";

interface Prop {
  todo: Todo;
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

export default function IndTodo({ todo, state, setState }: Prop): JSX.Element {
  // Will take user to individual todo page, and the page will know which todo is being edited based on idRelevantTodo
  function handleEditClick(): void {
    setState((state) => {
      const newState = { ...state };
      newState.onHomepage = false;
      newState.idRelevantTodo = todo.id;
      return newState;
    });
  }

  // Sends a request to server to delete the todos whose delete button was clicked, then requests the new list of todos
  // to update state
  async function handleDeleteClick(): Promise<void> {
    await axios.delete(`${url}/${todo.id}`);
    const newData: Todo[] = await (await axios.get("url")).data;
    setState((state) => {
      const newState = { ...state };
      newState.todos = newData;
      return newState;
    });
  }

  return (
    <div>
      <h3>{todo.title}</h3>
      <p>{todo.body}</p>
      <p>{todo.creationDate}</p>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}
