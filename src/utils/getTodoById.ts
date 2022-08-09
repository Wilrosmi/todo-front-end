import { Todo } from "./types";

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
