/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

const today = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const yesterday = new Date(today.getTime() - 1 * oneDay);
const tomorrow = new Date(today.getTime() + 1 * oneDay);

/*
Feedback from Pranshu Aggarwal(Teaching Assistant - Web Development)
- You are not adding a new todo in this test, you are just verifying the count of todos

Fixed: by expecting length to be zero before running all the tests and adding new todos in the respective test.
*/

describe("TodoList Test Suite by shivamsn97@gmail.com", () => {
  beforeAll(() => {
    expect(all.length).toBe(0);
  });

  test("Should add new tests correctly.", () => {
    add({ title: "Pay rent", dueDate: yesterday.toLocaleDateString("en-CA") });
    add({
      title: "Service vehicle",
      dueDate: today.toLocaleDateString("en-CA"),
    });
    add({ title: "File taxes", dueDate: tomorrow.toLocaleDateString("en-CA") });
    expect(all.length).toBe(3);
  });

  test("Should mark a task as completed.", () => {
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should return overdue tasks.", () => {
    expect(overdue().length).toBe(1);
    expect(overdue()[0].title).toBe("Pay rent");
  });

  test("Should return tasks due today.", () => {
    expect(dueToday().length).toBe(1);
    expect(dueToday()[0].title).toBe("Service vehicle");
  });

  test("Should return tasks due later.", () => {
    expect(dueLater().length).toBe(1);
    expect(dueLater()[0].title).toBe("File taxes");
  });
});
