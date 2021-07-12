import React from "react";

import TodoListItem from "../TodoListItem/TodoListItem";

import "../TodoList/TodoList.css";

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
    const elements = todos.map((item) => {
        return (
            <li key={item.id} className="list-group-item">
                <TodoListItem
                    onDeleted={() => {
                        onDeleted(item.id);
                    }}
                    label={item.label}
                    important={item.important}
                    done={item.done}
                    onToggleImportant={() => {
                        onToggleImportant(item.id);
                    }}
                    onToggleDone={() => {
                        onToggleDone(item.id);
                    }}
                />
            </li>
        );
    });

    return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
