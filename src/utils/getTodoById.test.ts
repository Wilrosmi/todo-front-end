import getTodoById from "./getTodoById";
import { Todo } from "./types";

test("Finds correct todo when given id in list", () => {
  expect(getTodoById(testTodoList, 2)).toStrictEqual({
    title: "b",
    body: "b",
    creationDate: testDate,
    id: 2,
  });
});
test("Returns correct error todo when id isnt in the list", () => {
  expect(getTodoById(testTodoList, 5).title).toBe("Error: No such ID"); // Only test title because of issues with matching dates when comparing the whole object
});

const testDate = new Date(); // To make all the dates the same
const testTodoList: Todo[] = [
  {
    title: "a",
    body: "a",
    creationDate: testDate,
    id: 1,
  },
  {
    title: "b",
    body: "b",
    creationDate: testDate,
    id: 2,
  },
  {
    title: "c",
    body: "c",
    creationDate: testDate,
    id: 3,
  },
];
