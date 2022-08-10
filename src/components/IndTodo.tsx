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
  function handleEditClick(): void {
    const newState = { ...state };
    newState.onHomepage = false;
    newState.idRelevantTodo = todo.id;
    setState(newState);
  }

  async function handleDeleteClick(): Promise<void> {
    console.log(todo.id);
    await axios.delete(`${url}/${todo.id}`);
    const newData: Todo[] = (await axios.get("url"))
      .data;
    const newState = { ...state };
    newState.todos = newData;
    setState(newState);
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
