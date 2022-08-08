import {Todo} from "../utils/types"
import {State} from "../App"
import axios from "axios"

interface Prop {
    todo: Todo,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>
}

export default function IndTodo({todo, state, setState}: Prop): JSX.Element {
    
    function handleEditClick(): void {
        const newState = {...state};
        newState.onHomepage = false;
        newState.idRelevantTodo = todo.id;
        setState(newState);
    }
    
    async function handleDeleteClick(): Promise<void> {
        const response: unknown = await (await axios.delete(`http://localhost:4000/todos/${todo.id}`)).data;
        const newData: Todo[] = await (await axios.get("http://localhost:4000")).data;
        const newState = {...state};
        newState.todos = newData;
        setState(newState);
    }

    return (
        <div>
            <h3>{todo.title}</h3>
            <p>{todo.body}</p>
            <p>{todo.creationDate}</p>
            <button onClick={handleEditClick} >Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}