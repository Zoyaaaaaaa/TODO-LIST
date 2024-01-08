import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Calendar from "react-calendar";
import "./Todo.css";
import "react-calendar/dist/Calendar.css"; 

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  let styles = { textAlign: "center" };

  const newTask = () => {
    setTodo([...todo, { task: newTodo, id: uuidv4(), done: false, date: selectedDate }]);
    setNewTodo("");
  };

  const updateTask = (event) => {
    setNewTodo(event.target.value);
  };

  const deleteTask = (id) => {
    setTodo(todo.filter((task) => task.id !== id));
  };

  const toggleDone = (id) => {
    setTodo(
      todo.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="container">
      <h1>To Do </h1>
      <input
        type="text"
        onChange={updateTask}
        value={newTodo}
        placeholder="Enter tasks.."
      />
      &nbsp; &nbsp;
      <button
        style={{
          marginLeft: "47.5%",
          marginTop: "0.2rem",
          padding: "0.6rem",
          backgroundColor: "white",
          color: "black",
        }}
        onClick={newTask}
      >
        Add
      </button>

      <hr />
      <h2 style={styles}>Tasks</h2>
      <TransitionGroup className="todo-list">
        {todo.map((task) => (
          <CSSTransition key={task.id} timeout={500} classNames="fade">
            <li className={task.done ? "done" : ""}>
              {task.task} - {task.date.toDateString()} 
              <span>
                <button onClick={() => toggleDone(task.id)}>
                  {task.done ? "Undo" : "Mark as Done"}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </span>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div className="calendar">
        <h2 style={styles}>Calendar</h2>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>
    </div>
  );
}



