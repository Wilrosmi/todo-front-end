import { useState, useEffect } from "react";
import { Todo } from "./utils/types";
import axios from "axios";
import Homepage from "./components/Homepage";
import ModifyTodo from "./components/ModifyTodo";

export interface State {
  todos: Todo[],
  onHomepage: boolean,
  idRelevantTodo: number
}

function App(): JSX.Element {
  
  const [state, setState] = useState<State>({
    todos: [],
    onHomepage: true,
    idRelevantTodo: -1
  })

  console.log(state.todos);

  const {todos, onHomepage} = state;

  useEffect(() => {
    const getTodos = async () => {
      const response: Todo[] = (await axios.get("http://localhost:4000/todos")).data;
      const newState = {...state};
      newState.todos = response;
      setState(newState);
    }
    getTodos();
  }, []);
  
  
  return (
    <div>
      {onHomepage ? <Homepage todos={todos} setState={setState} state={state} /> : <ModifyTodo state={state} setState={setState} />}
    </div>
  )
}

export default App;
