import {Todo} from "../utils/types";
import IndTodo from "./IndTodo";
import {State} from "../App";

interface Prop {
    todos: Todo[],
    setState: React.Dispatch<React.SetStateAction<State>>,
    state: State
}

export default function Homepage({todos, setState, state}: Prop): JSX.Element {
    
    function handleCreateClick(): void {
        const newState = {...state};
        newState.onHomepage = false;
        newState.idRelevantTodo = -1;
        setState(newState);
    }

    return (
        <div>
            <h1>Will's Todo App</h1>
            {todos.map(todo => <IndTodo todo={todo} key={todo.id} state={state} setState={setState} />)}
            <button onClick={handleCreateClick}>Create a Todo</button>
        </div>
    )
}