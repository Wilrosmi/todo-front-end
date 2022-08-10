import { Todo } from "../utils/types";
import IndTodo from "./IndTodo";
import { State } from "../App";

interface Prop {
  todos: Todo[];
  setState: React.Dispatch<React.SetStateAction<State>>;
  state: State;
}

export default function Homepage({
  todos,
  setState,
  state,
}: Prop): JSX.Element {
  // Sets state such that user will be taken off the homepage on next render, and will be taken to the generic todo view
  // as the id is -1.
  function handleCreateClick(): void {
    setState((state) => {
      const newState = { ...state };
      newState.onHomepage = false;
      newState.idRelevantTodo = -1;
      return newState;
    });
  }

  // Renders every individual todo in the correct form using map. Also renders the create todo button.
  return (
    <div>
      <h1>Will's Todo App</h1>
      {todos.map((todo) => (
        <IndTodo todo={todo} key={todo.id} state={state} setState={setState} />
      ))}
      <button onClick={handleCreateClick}>Create a Todo</button>
    </div>
  );
}
