const {todoList, formattedDate} = require('../todo')

const { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList } = todoList()

describe("TodoList Test Suite by shivamsn97@gmail.com", () => {
    test("Should add new tests correctly.", () => {
        expect(all.length).toBe(0)
        add({ title: "Pay rent", dueDate: "2022-11-01", completed: false })
        expect(all.length).toBe(1)
        expect(all[0].title).toBe("Pay rent")
        expect(all[0].dueDate).toBe("2022-11-01")
        expect(all[0].completed).toBe(false)
    });

    test("Should mark a task as completed.", () => {
        expect(all.length).toBe(1)
        expect(all[0].completed).toBe(false)
        markAsComplete(0)
        expect(all[0].completed).toBe(true)
    });

    test("Should return overdue tasks.", () => {
        // fake jest date to be 2022-07-22 for new Date
        jest
          .useFakeTimers()
          .setSystemTime(new Date('2022-07-22'));
        expect(formattedDate(new Date())).toBe("2022-07-22")
        expect(all.length).toBe(1)
        expect(overdue().length).toBe(0)
        add({ title: "Submit assignment", dueDate: "2022-07-21", completed: false })
        expect(overdue().length).toBe(1)
        expect(overdue()[0].title).toBe("Submit assignment")
        expect(overdue()[0].dueDate).toBe("2022-07-21")
    });

    test("Should return tasks due today.", () => {
        jest
          .useFakeTimers()
          .setSystemTime(new Date('2022-07-21'));
        expect(formattedDate(new Date())).toBe("2022-07-21")
        expect(all.length).toBe(2)
        console.log(all)
        expect(dueToday().length).toBe(1)
        expect(dueToday()[0].title).toBe("Submit assignment")
        expect(dueToday()[0].dueDate).toBe("2022-07-21")
    });

    test("Should return tasks due later.", () => {
        jest
          .useFakeTimers()
          .setSystemTime(new Date('2022-07-22'));
        expect(formattedDate(new Date())).toBe("2022-07-22")
        expect(all.length).toBe(2)
        expect(dueLater().length).toBe(1)
        expect(dueLater()[0].title).toBe("Pay rent")
        expect(dueLater()[0].dueDate).toBe("2022-11-01")
    });
});