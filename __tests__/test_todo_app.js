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
    const length = all.length;
    add({
      title: "Pay rent",
      dueDate: yesterday.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(all.length).toBe(length + 1);
    expect(all[0].title).toBe("Pay rent");
    expect(all[0].dueDate).toBe(yesterday.toLocaleDateString("en-CA"));
    expect(all[0].completed).toBe(false);
  });

  test("Should mark a task as completed.", () => {
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should return overdue tasks.", () => {
    const overduelen = overdue().length;
    add({
      title: "Return book",
      dueDate: yesterday.toLocaleDateString("en-CA"),
    });
    expect(overdue().length).toBe(overduelen + 1);
    expect(overdue()[overduelen].title).toBe("Return book");
  });

  test("Should return tasks due today.", () => {
    const duetodaylen = dueToday().length;
    add({
      title: "Service vehicle",
      dueDate: today.toLocaleDateString("en-CA"),
    });
    expect(dueToday().length).toBe(duetodaylen + 1);
    expect(dueToday()[duetodaylen].title).toBe("Service vehicle");
  });

  test("Should return tasks due later.", () => {
    const duelaterlen = dueLater().length;
    add({
      title: "Buy groceries",
      dueDate: tomorrow.toLocaleDateString("en-CA"),
    });
    expect(dueLater().length).toBe(duelaterlen + 1);
    expect(dueLater()[duelaterlen].title).toBe("Buy groceries");
  });
});
