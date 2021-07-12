import React from "react";
import ReactDOM from "react-dom";

import TodoList from "./components/TodoList/TodoList";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import AppHeader from "./components/AppHeader/AppHeader";
import ItemStatusFilter from "./components/ItemStatusFilter/ItemStatusFilter";
import ItemAddForm from "./components/ItemAddForm/ItemAddForm";

class App extends React.Component {
    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have a lunch"),
        ],

        searchText: "",
        filter: "all",
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
        };
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const before = todoData.splice(0, idx);
            const after = todoData.splice(idx + 1);
            const newArray = [...before, ...after];

            return {
                todoData: newArray,
            };
        });
    };

    addItem = (text) => {
        if (text !== "") {
            const newItem = this.createTodoItem(text);

            this.setState(({ todoData }) => {
                const newArray = [...todoData, newItem];

                return {
                    todoData: newArray,
                };
            });
        }
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const stateCopy = [...todoData];

            stateCopy[idx].important = !stateCopy[idx].important;

            return {
                todoData: stateCopy,
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const stateCopy = [...todoData];

            stateCopy[idx].done = !stateCopy[idx].done;

            return {
                todoData: stateCopy,
            };
        });
    };

    search = (text) => {
        return this.state.todoData.filter((el) => {
            return el.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });
    };

    filter1 = (array, text) => {
        switch (text) {
            case "all":
                return array;
            case "active":
                return array.filter((el) => {
                    return !el.done;
                });

            case "done":
                return array.filter((el) => {
                    return el.done;
                });
        }
    };

    updateSearchText = (text) => {
        this.setState({
            searchText: text,
        });
    };

    onFilterChange = (text) => {
        this.setState({
            filter: text,
        });
    };

    render() {
        const done = this.state.todoData.filter((el) => el.done).length;
        const toDo = this.state.todoData.length - done;

        const finaltodoData = this.filter1(
            this.search(this.state.searchText),
            this.state.filter
        );

        return (
            <div className="todo-app">
                <AppHeader toDo={toDo} done={done} />
                <div className="top-panel d-flex">
                    <SearchPanel updateSearchText={this.updateSearchText} />
                    <ItemStatusFilter
                        filter={this.state.filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList
                    onDeleted={this.deleteItem}
                    todos={finaltodoData}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
