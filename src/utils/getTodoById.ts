import { Todo } from "./types";

/**
 *
 * Returns the full data of a todo when given the id of said todo. If no such id exists in the list of todos, returns
 * an todo with an error message.
 *
 * @param list - list of todos to search
 * @param targetId - id of tagedt todo
 * @returns the full data for the todo
 */
export default function getTodoById(list: Todo[], targetId: number): Todo {
  for (const td of list) {
    if (td.id === targetId) {
      return td;
    }
  }
  return {
    title: "Error: No such ID",
    body: "",
    creationDate: new Date(),
    id: -1,
  };
}
