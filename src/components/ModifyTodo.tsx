import {State} from "../App"
import getTodoById from "../utils/getTodoById"
import {useState} from "react";
import axios from "axios"
import {Todo} from "../utils/types"

interface Prop {
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>
}

export default function ModifyTodo({state, setState}: Prop): JSX.Element {
    const todo = getTodoById(state.todos, state.idRelevantTodo);
    const titleValue = state.idRelevantTodo === -1 ? "" : todo.title;
    const bodyValue = state.idRelevantTodo === -1 ? "" : todo.body;
    const [inputTitle, setInputTitle] = useState(titleValue);
    const [inputBody, setInputBody] = useState(bodyValue);
    
    function handleSubmit(): void {
        const url = "http://localhost:4000/todos"
        const check = state.idRelevantTodo === -1 ? axios.post(url, {title: inputTitle, body: inputBody}) : axios.put(`${url}/${state.idRelevantTodo}`, {title: inputTitle, body: inputBody});
        console.log(check);
        const newState = {...state};
        const getNewTodos = async (): Promise<void> => {
            const response: Todo[] = await (await axios.get(url)).data;
            const newState = {...state};
            newState.onHomepage = true;
            newState.todos = response;
            setState(newState);
        }
        getNewTodos();
    }

    return (
        <div>
            <input value={inputTitle} onChange={e => setInputTitle(e.target.value)} />
            <input value={inputBody} onChange={e => setInputBody(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}