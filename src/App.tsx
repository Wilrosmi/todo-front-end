import { useState, useEffect } from "react";
import { Todo } from "./utils/types";
import axios from "axios";
import Homepage from "./components/Homepage";
import ModifyTodo from "./components/ModifyTodo";
import url from "./utils/url";

// State description - todos is list of all todos in the database. onHomepage describes whether the app should be on
// the homepage or an individual todo page. idRelevantTodo details the individual todo that should be on the individual
// page. If we are creating a brand new todo, idRelevantTodo will be -1 to indicate that there is not relevant todo
export interface State {
  todos: Todo[];
  onHomepage: boolean;
  idRelevantTodo: number;
}

function App(): JSX.Element {
  const [state, setState] = useState<State>({
    todos: [],
    onHomepage: true,
    idRelevantTodo: -1,
  });

  const { todos, onHomepage } = state;

  // Load in data on first render. All subsequent loads of data will be in response to actions of user, so useEffect
  // only needs to run once.
  useEffect(() => {
    const getTodos = async () => {
      const response: Todo[] = (await axios.get(url)).data;
      setState((state) => {
        const newState = { ...state };
        newState.todos = response;
        return newState;
      });
    };
    getTodos();
  }, []);

  // Render the homepage or the individual todo page, based on onHomepage value
  return (
    <div>
      {onHomepage ? (
        <Homepage todos={todos} setState={setState} state={state} />
      ) : (
        <ModifyTodo state={state} setState={setState} />
      )}
    </div>
  );
}

export default App;
